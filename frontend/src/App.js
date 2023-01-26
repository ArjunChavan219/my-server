import React, { useEffect, useState, useReducer } from "react"


function UserDiv({ user, updateUsers }) {
	const [isLoggedIn, setIsLoggedIn] = useState(user.isLoggedIn)
	const [buttonContent, setButtonContent] = useState(isLoggedIn ? "Logout" : "Login")

	function handleClick() {
		setIsLoggedIn(!isLoggedIn)
	}

	useEffect(() => {
		updateUsers({
			type: "logUpdate",
			id: user.id,
			user: {...user, isLoggedIn: isLoggedIn}
		})
		setButtonContent(isLoggedIn ? "Logout" : "Login")
	}, [isLoggedIn])

	return (
		<div key={user.id}>
			<p>User {user.username}:</p>
			{isLoggedIn && 
				<>
					<p>You are logged in.</p>
					<p>Your password is: {user.password}</p>
				</>
			}
			<button onClick={handleClick}>
				{buttonContent}
			</button>
			<br />
			<br />
		</div>
	)
}

function usersReducer(users, action) {
	switch (action.type) {
		case "addUsers": {
			return action.users
		}
		case "logUpdate": {
			return users.map(user => {
				if (user.id == action.id) {
					return action.user
				} else {
					return user
				}
			})
		}
		default: {
			throw Error("Unknown action: " + action.type)
		}
	}
}

function App() {
	const [users, usersDispatch] = useReducer(usersReducer, [])
	const [activeUsers, setActiveUsers] = useState(0)

	useEffect(() => {
		fetch("/users").then(
			res => res.json()
		).then(
			data => {
				usersDispatch({
					type: "addUsers",
					users: data.users
				})
			}
		)
	}, [])

	useEffect(() => {
		setActiveUsers(users.filter(user => user.isLoggedIn).length)
	}, [users])

	function handleSaveSession() {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({users: users})
		}
		fetch("/users", requestOptions).then(
			res => res.json()
		).then(
			data => {
				console.log(data)
			}
		)
	}

	return (
		<div>
			<p>Homepage</p>
			<p>Total Active Users: {activeUsers}</p>
			<br />
			{users.map((user, itr) => <UserDiv key={itr} user={user} updateUsers={usersDispatch}/>)}
			<br />
			<button onClick={handleSaveSession}>Save Session</button>
		</div>
	)
}

export default App

import React, { useEffect, useState } from "react"


function UserDiv({ user }) {
	const [isLoggedIn, setIsLoggedIn] = useState(user.isLoggedIn)
	const [buttonContent, setButtonContent] = useState(isLoggedIn ? "Logout" : "Login")

	function handleClick() {
		setIsLoggedIn(!isLoggedIn)
	}

	useEffect(() => {
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

function App() {
	const [users, setUsers] = useState([])

	useEffect(() => {
		fetch("/users").then(
			res => res.json()
		).then(
			data => {
				setUsers(data.users)
				console.log("here")
				console.log(data.users)
			}
		)
	}, [])

	return (
		<div>
			<p>Homepage</p>
			<br />
			{users.map((user, itr) => <UserDiv key={itr} user={user}/>)}
		</div>
	)
}

export default App

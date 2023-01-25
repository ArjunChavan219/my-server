import React, { useEffect, useState } from "react"

const users = [
	{
		id: "1",
		username: "test-user-1",
		password: "pass@1",
		isLoggedIn: false
	},
	{
		id: "2",
		username: "test-user-2",
		password: "pass@2",
		isLoggedIn: true
	},
	{
		id: "3",
		username: "test-user-3",
		password: "pass@3",
		isLoggedIn: false
	}
]

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
	return (
		<div>
			<p>Homepage</p>
			<br />
			{users.map(user => <UserDiv user={user}/>)}
		</div>
	)
}

export default App

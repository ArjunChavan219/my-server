import React from "react"

const users = [
	{
		id: "1",
		username: "test-user-1",
		password: "pass@1",
		logged_in: false
	},
	{
		id: "2",
		username: "test-user-2",
		password: "pass@2",
		logged_in: true
	},
	{
		id: "3",
		username: "test-user-3",
		password: "pass@3",
		logged_in: false
	}
]

function UserDiv() {
	const user_divs = users.map(user => <div key={user.id}>
		<p>User {user.username}:</p>
		{user.logged_in ? (
			<>
				<p>You are logged in.</p>
				<p>Your password is: {user.password}</p>
			</>
		) : (
			<>
				<p>Please log in!</p>
			</>
		)}
		<br />
	</div>)
	return (
		<div>
			{user_divs}
		</div>
	)
}

function App() {
	return (
		<div>
			<p>Homepage</p>
			<br />
			<UserDiv />
		</div>
	)
}

export default App

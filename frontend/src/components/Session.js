import React, { useEffect, useState, useReducer } from "react"

import { useAuth } from "../provider/AuthProvider"


function TaskDiv({ task, updateTasks }) {
	const [isDone, setIsDone] = useState(task.isDone)
	const [buttonContent, setButtonContent] = useState("To Do")

	function handleClick() {
		setIsDone(!isDone)
	}

	useEffect(() => {
		updateTasks({
			type: "taskUpdate",
			id: task.id,
			task: {...task, isDone: isDone}
		})
		setButtonContent(isDone ? "To Do" : "Done")
	}, [isDone])

	return (
		<div key={task.id}>
			<p>Task: {task.name}</p>
			{!isDone && <p>Description: {task.description}</p>}
			<button onClick={handleClick}>
				{buttonContent}
			</button>
			<br />
			<br />
		</div>
	)
}

function tasksReducer(tasks, action) {
	switch (action.type) {
		case "addTasks": {
			return action.tasks
		}
		case "taskUpdate": {
			return tasks.map(task => {
				if (task.id == action.id) {
					return action.task
				} else {
					return task
				}
			})
		}
		default: {
			throw Error("Unknown action: " + action.type)
		}
	}
}

function Session() {
	const [tasks, tasksDispatch] = useReducer(tasksReducer, [])
	const [activeTasks, setActiveTasks] = useState(0)
	const { server } = useAuth()

	useEffect(() => {
		server.get_tasks().then(
			data => {
				tasksDispatch({
					type: "addTasks",
					tasks: data.tasks
				})
			}
		)
	}, [])

	useEffect(() => {
		setActiveTasks(tasks.filter(task => !task.isDone).length)
	}, [tasks])

	function handleSaveSession() {
		server.set_tasks(tasks).then(
			data => {
				console.log(data)
			}
		)
	}

	return (
		<div>
            <br />
			<p>Session Page</p>
			<p>Total Active Tasks: {activeTasks}</p>
			<br />
			{tasks.map((task, itr) => <TaskDiv key={itr} task={task} updateTasks={tasksDispatch}/>)}
			<br />
			<button onClick={handleSaveSession}>Save Session</button>
		</div>
	)
}

export default Session

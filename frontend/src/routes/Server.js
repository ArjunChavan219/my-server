export default class Server {
    constructor(user, handlePageChange) {
        this.url = "http://0.0.0.0:5001"
        this.user = user
        this.handlePageChange = handlePageChange
    }

    session_check() {
        const current_user = JSON.parse(window.localStorage?.getItem("USER_STATE")) || {
            username: "",
            permissions: []
        }
        return JSON.stringify(current_user) !== JSON.stringify(this.user)
    }

    async get_tasks() {
        if (this.session_check()) {
            this.handlePageChange()
            return Promise.resolve({
                tasks: []
            })
        }
        return fetch(`${this.url}/tasks`).then(
			res => res.json()
		)
    }

    async set_tasks(tasks) {
        this.handlePageChange()
        if (this.session_check()) {
            this.handlePageChange()
            return Promise.resolve({})
        }
        const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({tasks: tasks})
		}
		return fetch(`${this.url}/tasks`, requestOptions).then(
			res => res.json()
		)
    }

    async login(username, password) {
        const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
                "username": username,
                "password": password
            })
		}
		return fetch(`${this.url}/login`, requestOptions).then(
			res => res.json()
		)
    }
}

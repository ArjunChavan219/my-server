import pymongo
from flask import Flask, request
from flask_cors import CORS


client = pymongo.MongoClient("mongodb://localhost:27017/")
test_db = client["testDB"]

app = Flask(__name__)
CORS(app)


def list_to_dict_task(tasks_):
    return {task["id"]: task for task in tasks_}


def list_to_dict_user(users_):
    return {user["username"]: user for user in users_}


@app.route('/tasks', methods=["GET", "POST"])
def get_tasks():
    tasks = test_db["tasks"]
    current_tasks = list(tasks.find({}, {"_id": 0}))
    if request.method == "POST":
        update_tasks = []
        initial_state = list_to_dict_task(current_tasks)
        new_state = list_to_dict_task(request.json["tasks"])

        for task_id in new_state:
            if initial_state[task_id]["isDone"] != new_state[task_id]["isDone"]:
                update_tasks.append((task_id, new_state[task_id]["isDone"]))

        for task_id, isDone in update_tasks:
            tasks.update_one({"id": task_id}, {"$set": {"isDone": isDone}})
        return {
            "status": 200
        }
    else:
        return {
            "tasks": current_tasks
        }


@app.route('/users', methods=["GET", "POST"])
def get_users():
    users = test_db["users"]
    users_dict = list_to_dict_user(list(users.find({}, {"_id": 0})))

    if request.method == "POST":
        print("post")
        return {
            "status": 200
        }
    else:
        return {
            "users": users_dict
        }


@app.route('/login', methods=["POST"])
def login_check():
    users = test_db["users"]
    users_dict = list_to_dict_user(list(users.find({}, {"_id": 0})))

    username = request.json["username"]
    password = request.json["password"]

    if username not in users_dict:
        return {
            "success": False,
            "error": "Username"
        }
    if users_dict[username]["password"] != password:
        return {
            "success": False,
            "error": "Password"
        }

    return {
        "success": True
    }


if __name__ == '__main__':
    app.run(debug=True)

import pymongo
from flask import Flask, request
from flask_cors import CORS

client = pymongo.MongoClient("mongodb://localhost:27017/")
test_db = client["testDB"]
tasks = test_db["tasks"]

app = Flask(__name__)
CORS(app)


def list_to_dict(users):
    return {user["id"]: user for user in users}


@app.route('/tasks', methods=["GET", "POST"])
def get_tasks():

    current_tasks = list(tasks.find({}, {"_id": 0}))
    if request.method == "POST":
        update_tasks = []
        initial_state = list_to_dict(current_tasks)
        new_state = list_to_dict(request.json["tasks"])

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


if __name__ == '__main__':
    app.run()

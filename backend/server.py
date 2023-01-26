import pymongo
from flask import Flask, request

client = pymongo.MongoClient("mongodb://localhost:27017/")
app = Flask(__name__)
test_db = client["testDB"]
users = test_db["users"]


@app.route('/users', methods=["GET", "POST"])
def get_users():
    current_users = list(users.find({}, {"_id": 0}))
    if request.method == "POST":
        print(request.json)
        return {
            "status": 200
        }
    else:
        return {
            "users": current_users
        }


if __name__ == '__main__':
    app.run(debug=True)

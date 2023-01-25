from flask import Flask

app = Flask(__name__)


@app.route('/users')
def get_users():
    return {
        "users": [
            {
                "id": "1",
                "username": "test-user-1",
                "password": "pass@1",
                "isLoggedIn": False
            },
            {
                "id": "2",
                "username": "test-user-2",
                "password": "pass@2",
                "isLoggedIn": True
            },
            {
                "id": "3",
                "username": "test-user-3",
                "password": "pass@3",
                "isLoggedIn": False
            }
        ]
    }


if __name__ == '__main__':
    app.run(debug=True)

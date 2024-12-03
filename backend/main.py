import flask
import uuid
import json
import db
from user import User
app = flask.Flask(__name__)
@app.route('/user')
def user():
    random_id = str(uuid.uuid4())
    bool = db.create_user(random_id)
    if bool:
        return json.dumps({'id': str(random_id)})
    else:
        return json.dumps({'error': 'User could not be created.'})

def main():
    db.init_db()
    app.run(host='localhost', port=5000)

if __name__ == '__main__':
    main()
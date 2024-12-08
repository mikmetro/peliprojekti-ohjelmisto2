import flask
from flask_socketio import SocketIO
from flask_cors import CORS
import uuid
import json
import db
from user import User
from airport import Airport
app = flask.Flask(__name__)
CORS(app)

socketio = SocketIO(app)

@app.route('/user/create')
def user_create():
    random_id = str(uuid.uuid4())
    bool = db.create_user(random_id)
    if bool:
        return json.dumps({'id': str(random_id)})
    else:
        return json.dumps({'error': 'User could not be created.'})

@app.route("/game/airports")
def all_airports():
    list_of_airports = db.get_airports()
    return json.dumps(list_of_airports)

@socketio.on('connect')
def handle_connect():
    print("Client connected")

@socketio.on('purchase')
def handle_purchase(data):
    #Handle purchase logic
    print("Purchase data received", data)
    #Get and check user money WIP
    data = json.loads(data)

    user = User(data["id"])
    response_y = {'status': 'success', 'message': 'Purchase completed'}
    response_n = {'status': 'false', 'message': 'Purchase failed'}
    airport = Airport(None, data["airport_id"])
    if user.get_money() >= airport.get_price():
        return socketio.emit('purchase_response', response_y)
    if user.get_money() < airport.get_price():
        return socketio.emit('purchase_response', response_n)
    # Process the purchase





@socketio.on('upgrade')
def handle_upgrade(data):
    # Handle the upgrade logic here
    print("Upgrade data received:", data)
    # Process the upgrade

    response = {'status': 'success', 'message': 'Upgrade completed.'}
    socketio.emit('upgrade_response', response)

@socketio.on('send')
def handle_send(data):
    # Handle the send logic here
    print("Send data received:", data)
    # Process the send action (e.g., send a message, etc.)

    response = {'status': 'success', 'message': 'Send action completed.'}
    socketio.emit('send_response', response)

def main():
    socketio.run(app.run(host='localhost', port=5500), debug=True)

if __name__ == '__main__':
    db.init_db()
    db.create_user('testuser')
    user = User('testuser')
    print(user.get_airports()[0].get_country())
    main()

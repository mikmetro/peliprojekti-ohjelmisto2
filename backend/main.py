import flask
from flask_socketio import SocketIO
from flask_cors import CORS
import uuid
import json
import db
from user import User
from airport import Airport, OwnedAirport
from upgrades import pre_calculate_upgrades
app = flask.Flask(__name__)
CORS(app)

socketio = SocketIO(app)

# Laitan vaan kaikki default lentokentät variableen, että ei tarvi kysyä databaselta joka request.
ALL_DEFAULT_AIRPORTS_JSON = json.dumps(db.get_airports())
ALL_UPGRADE_EFFECTS = pre_calculate_upgrades()

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
    return ALL_DEFAULT_AIRPORTS_JSON

@app.route("/game/upgrades")
def all_upgrades():
    return ALL_UPGRADE_EFFECTS

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
    airport = OwnedAirport(None, data["airport_id"])
    if user.get_money() >= airport.get_price():
        pass
    # Process the purchase


    response = {'status': 'success', 'message': 'Purchase completed'}
    socketio.emit('purchase_response', response)

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

import flask
from flask_socketio import SocketIO
import uuid
import json
import db
from user import User
app = flask.Flask(__name__)

socketio = SocketIO(app)

@app.route('/user')
def user():
    random_id = str(uuid.uuid4())
    bool = db.create_user(random_id)
    if bool:
        return json.dumps({'id': str(random_id)})
    else:
        return json.dumps({'error': 'User could not be created.'})
    
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
    airport = Airport(data["airport_id"])
    if user.get_money() >= airport.get_price():
        pass
    #Process the purchase


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
    db.init_db()
    socketio.run(app.run(host='localhost', port=5500), debug=True)

if __name__ == '__main__':
    main()
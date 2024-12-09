import flask
from flask_socketio import SocketIO
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
import uuid
import json
import db
import datetime
import time
from random import randint
from user import User
from airport import Airport, OwnedAirport, distance_km
from upgrades import pre_calculate_upgrades

# DO NOT PUT ANYTHING IMPORTANT IN THE FRONTEND
app = flask.Flask(__name__, static_folder="../frontend", static_url_path="/")
CORS(app)

socketio = SocketIO(app, cors_allowed_origins='*')

scheduler = BackgroundScheduler()
scheduler.start()

# Laitan vaan kaikki default lentokentät variableen, että ei tarvi kysyä databaselta joka request.
ALL_DEFAULT_AIRPORTS_JSON = json.dumps(db.get_airports())
ALL_UPGRADE_EFFECTS = pre_calculate_upgrades()

socket_connections = {}

def send_airplane(airport, socketid):
    socketio.emit("airplane_event", {'message': "success", 'icao': airport}, to=socketid)

def get_userdata(user):
    return {
        "money": user.get_money(),
        "co_level": user.get_co_level(),
        "airports": user.airports_to_dict()
    }

# Serves the frontend :/
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/user/create')
def user_create():
    random_id = str(uuid.uuid4())
    bool = db.create_user(random_id)
    User(random_id)
    if bool:
        return json.dumps({'id': str(random_id)})
    else:
        return json.dumps({'error': 'User could not be created.'})

@app.route("/user/fetch/<id>")
def fetch_user_data(id):
    user = User(id)
    if user == None:
        return { "status": False }
    return {
        "status": True,
        "money": user.get_money(),
        "co_level": user.get_co_level(),
        "airports": user.airports_to_dict()
    }

@app.route("/game/airports")
def all_airports():
    return ALL_DEFAULT_AIRPORTS_JSON

@app.route("/game/upgrades")
def all_upgrades():
    return ALL_UPGRADE_EFFECTS

@socketio.on('connect')
def handle_connect():
    print(flask.request.sid, "connected")

@socketio.on('disconnect')
def handle_disconnect():
    del socket_connections[flask.request.sid]

@socketio.on('set_key')
def handle_set_key(data):
    user = User(data)
    if user == None:
        return socketio.emit('set_key_response', {'status': False, 'message': 'user not found'})
    socket_connections[flask.request.sid] = data
    socketio.emit('set_key_response', {'status': True, 'message': 'success'})

@socketio.on('purchase')
def handle_purchase(data):
    airport_id = db.icao_to_id(data["airport_id"])
    if airport_id == None:
        return socketio.emit('purchase_response', {"status": False, "message": 'airport_not_found'})

    user = User(data["id"])
    airport = Airport(airport_id)

    user_money = user.get_money()
    airport_price = airport.get_price()

    if user_money < airport_price:
        return socketio.emit('purchase_response', {"status": False, "message": 'insufficient_funds'})

    can_unlock = user.unlock_airport(airport.airportId)
    if not can_unlock:
        return socketio.emit('purchase_response', {"status": False, "message": 'already_owned'})

    user.set_money(user_money - airport_price)

    socketio.emit('purchase_response', socketio.emit('purchase_response', {"status": True, "message": "success", "new_user_data": get_userdata(user)}))

@socketio.on('upgrade')
def handle_upgrade(data):
    # Handle the upgrade logic here
    print("Upgrade data received:", data)
    # Process the upgrade

    response = {'status': 'success', 'message': 'Upgrade completed.'}
    socketio.emit('upgrade_response', response)

@socketio.on('send')
def handle_send(data):
    user = User(data["id"])
    user_airports = user.airports_to_dict()

    all_airports =  db.get_airports()

    if data["icao"] not in all_airports:
        return socketio.emit('send_response', {'status': False, 'message': 'airport_doesnt_exist'})

    if data["icao"] not in user_airports:
        return socketio.emit('send_response', {'status': False, 'message': 'airport_not_owned'})

    all_icao_codes = [*all_airports]
    all_icao_codes.remove(data["icao"])

    rng = randint(0, len(all_icao_codes) - 1)
    destination_airport = all_icao_codes[rng]

    start = Airport(db.icao_to_id(data["icao"]))
    end = Airport(db.icao_to_id(destination_airport))

    distance = distance_km(start.get_coordinates(), end.get_coordinates())
    travel_time = distance

    run_time = datetime.datetime.fromtimestamp(time.time() + (distance / 1000))

    scheduler.add_job(send_airplane, 'date', args=[data["icao"], flask.request.sid], run_date=run_time)

    socketio.emit('send_response', {'status': True, 'message': 'success', 'destination': destination_airport})

def main():
    socketio.run(app, host='localhost', port=5500)

if __name__ == '__main__':
    db.init_db()
    db.create_user('testuser')
    user = User('testuser')
    main()

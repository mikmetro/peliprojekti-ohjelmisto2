import db
from math import radians, cos, sin, asin, sqrt

# copied from: https://github.com/NullByte3/FlightSim/blob/main/database.py
def distance_km(point1, point2):
    lat1, lon1 = point1
    lat2, lon2 = point2

    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    r = 6371
    return c * r

class Airport:
    def __init__(self, airportId):
        self.airportId = airportId

    def get_country(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT country FROM airports WHERE id = ?', (self.airportId,))
        country = cursor.fetchone()[0]
        return country

    def get_city(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT city FROM airports WHERE id = ?', (self.airportId,))
        city = cursor.fetchone()[0]
        return city

    def get_name(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT name FROM airports WHERE id = ?', (self.airportId,))
        name = cursor.fetchone()[0]
        return name

    def get_coordinates(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT latitude, longitude FROM airports WHERE id = ?', (self.airportId,))
        point = cursor.fetchone()
        return point

    def get_price(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT price FROM airports WHERE id = ?', (self.airportId,))
        price = cursor.fetchone()[0]
        return price

class OwnedAirport(Airport):
    def __init__(self, id, airportId):
        super().__init__(airportId)
        self.id = id

    def get_level(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT level FROM user_airports WHERE airport_id = ?', (self.id,))
        level = cursor.fetchone()[0]
        return level

    def set_level(self, level):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('UPDATE user_airports SET level = ? WHERE airport_id = ?', (level, self.id))
        connection.commit()
        return True

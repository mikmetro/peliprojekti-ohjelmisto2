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
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute(
            'SELECT country, city, name, latitude, longitude, icao, price, co, cash FROM airports WHERE id = ?',
            (self.airportId,)
        )
        self.airport_data = cursor.fetchone()

    def get_country(self):
        return self.airport_data[0]

    def get_city(self):
        return self.airport_data[1]

    def get_name(self):
        return self.airport_data[2]

    def get_coordinates(self):
        return (self.airport_data[3], self.airport_data[4])

    def get_icao(self):
        return self.airport_data[5]

    def get_price(self):
        return self.airport_data[6]

    def get_co(self):
        return self.airport_data[7]

    def get_cash(self):
        return self.airport_data[8]

class OwnedAirport(Airport):
    def __init__(self, id, airportId):
        super().__init__(airportId)
        self.id = id

    def get_level(self) -> list[int]:
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT level FROM user_airports WHERE id = ?', (self.id,))
        level = cursor.fetchone()[0]
        level = [int(i) for i in level.split(";")]
        return level

    def set_level(self, level):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('UPDATE user_airports SET level = ? WHERE airport_id = ?', (level, self.id))
        connection.commit()
        return True

import db
from airport import OwnedAirport

class User():
    def __init__(self, id):
        self.id = id
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM users WHERE id = ?', (self.id,))
        if cursor.fetchone() is None:
            return None
        # connection.close()
        self.unlock_airport(421) # Helsingin lentoasema, default airport.

    def get_money(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT money FROM users WHERE id = ?', (self.id,))
        money = cursor.fetchone()[0]
        # connection.close()
        return money

    def get_airports(self) -> list[OwnedAirport]:
        connection = db.create_connection()
        cursor = connection.cursor()
        airports = []
        cursor.execute('SELECT id, airport_id FROM user_airports WHERE owner = ?', (self.id,))
        for row in cursor.fetchall():
            airports.append(OwnedAirport(row[0], row[1]))
        # connection.close()
        return airports

    def airports_to_dict(self):
        user_airports = self.get_airports()
        result = {}
        for airport in user_airports:
            result[airport.get_icao()] = {
                "levels": airport.get_level()
            }
        return result

    def unlock_airport(self, airportId):
        connection = db.create_connection()
        cursor = connection.cursor()
        # Check if it's already unlocked.
        cursor.execute('SELECT * FROM user_airports WHERE owner = ? AND airport_id = ?', (self.id, airportId))
        if cursor.fetchone() is not None:
            # connection.close()
            return False # Airport already unlocked, return False and do not unlock it again.
        cursor.execute('INSERT INTO user_airports (owner, airport_id, level) VALUES (?, ?, ?)', (self.id, airportId, '0;0;0'))
        connection.commit()
        # connection.close()
        return True

    def set_money(self, money):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('UPDATE users SET money = ? WHERE id = ?', (money, self.id))
        connection.commit()
        # connection.close()

    def get_co_level(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT co_level FROM users WHERE id = ?', (self.id,))
        co_level = cursor.fetchone()[0]
        # connection.close()
        return co_level

    def set_co_level(self, co_level):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('UPDATE users SET co_level = ? WHERE id = ?', (co_level, self.id))
        connection.commit()
        # connection.close()

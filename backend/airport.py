import db

class Airport():
    def __init__(self, id, airportId):
        self.id = id
        self.airportId = airportId

    def get_level(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT level FROM user_airports WHERE airport_id = ?', (self.id,))
        level = cursor.fetchone()[0]
        # connection.close()
        return level

    def set_level(self, level):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('UPDATE user_airports SET level = ? WHERE airport_id = ?', (level, self.id))
        connection.commit()
        # connection.close()
        return True

    def get_country(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT country FROM airports WHERE id = ?', (self.airportId,))
        country = cursor.fetchone()[0]
        # connection.close()
        return country

    def get_city(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT city FROM airports WHERE id = ?', (self.airportId,))
        city = cursor.fetchone()[0]
        # connection.close()
        return city

    def get_name(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT name FROM airports WHERE id = ?', (self.airportId,))
        name = cursor.fetchone()[0]
        # connection.close()
        return name

    def get_coordinates(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT latitude, longitude FROM airports WHERE id = ?', (self.airportId,))
        point = cursor.fetchone()
        # connection.close()
        return point

    def get_price(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT price FROM airports WHERE id = ?', (self.airportId,))
        price = cursor.fetchone()[0]
        # connection.close()
        return price

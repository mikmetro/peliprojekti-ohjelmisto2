import db
import json
class User():
    def __init__(self, id):
        self.id = id
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM users WHERE id = ?', (self.id,))
        if cursor.fetchone() is None:
            raise ValueError('User does not exist')
        connection.close()

    def get_money(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT money FROM users WHERE id = ?', (self.id,))
        money = cursor.fetchone()[0]
        connection.close()
        return money

    def get_airports(self):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT airports FROM users WHERE id = ?', (self.id,))
        airports = cursor.fetchone()[0]
        connection.close()
        return json.loads(airports)

    def unlock_airport(self, airport):
        airports = self.get_airports()
        airports.append(airport)
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('UPDATE users SET airports = ? WHERE id = ?', (json.dumps(airports), self.id))
        connection.commit()
        connection.close()

    def set_money(self, money):
        connection = db.create_connection()
        cursor = connection.cursor()
        cursor.execute('UPDATE users SET money = ? WHERE id = ?', (money, self.id))
        connection.commit()
        connection.close()
import sqlite3
con = sqlite3.connect('database.db', check_same_thread=False) # check_same_thread on pois, koska se muuten antoi erroreita, että objektit on haettu eri threadissä, kuin missä ne on tehty.

def create_connection():
    return con
def init_db():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS users (id TEXT, money REAL, airports TEXT, co_level INTEGER)')
    cursor.execute('CREATE INDEX IF NOT EXISTS id_index_users ON users (id)')

    cursor.execute('CREATE TABLE IF NOT EXISTS user_airports (id INTEGER PRIMARY KEY AUTOINCREMENT, owner TEXT, airport_id INTEGER, level TEXT)')
    cursor.execute('CREATE INDEX IF NOT EXISTS id_index_user_airports ON user_airports (id)')

    connection.commit()
    # connection.close()

def create_user(id):
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM users WHERE id = ?', (id,))
    print(cursor.rowcount)
    if cursor.rowcount > 0:
        return False
    cursor.execute('INSERT INTO users (id, money, airports, co_level) VALUES (?, ?, ?, ?)', (id, 0, '[]', 0))
    connection.commit()
    # connection.close()
    return True

def get_airports():
    connection = create_connection()
    cursor = connection.cursor()

    cursor.execute('SELECT * FROM airports')
    data = cursor.fetchall()

    result = {}
    for i in data:
        result[i[5]] = {
            "name": i[1],
            "lat": i[6],
            "lng": i[7],
            "price": i[8],
            "co_generation": i[9],
            "cash_generation": i[10]
        }

    # connection.close()

    return result

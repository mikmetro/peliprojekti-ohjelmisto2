import sqlite3

def create_connection():
    return sqlite3.connect('database.db')

def init_db():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS users (id TEXT, money REAL, airports TEXT, co_level INTEGER)')
    cursor.execute('CREATE INDEX IF NOT EXISTS id_index_users ON users (id)')

    cursor.execute('CREATE TABLE IF NOT EXISTS airports (id INTEGER, name TEXT, price INTEGER, max_upgrade_levels TEXT, co_generation INTEGER, security_level INTEGER)')
    cursor.execute('CREATE INDEX IF NOT EXISTS id_index_airports ON airports (id)')

    cursor.execute('CREATE TABLE IF NOT EXISTS user_airports (id INTEGER, owner TEXT, airport_id INTEGER, levels TEXT)')
    cursor.execute('CREATE INDEX IF NOT EXISTS id_index_user_airports ON user_airports (id)')

    connection.commit()
    connection.close()

def create_user(id):
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO users (id, money, airports, co_level) VALUES (?, ?, ?, ?)', (id, 0, '[]', 0))
    connection.commit()
    connection.close()
    return True

def get_airports():
    connection = create_connection()
    cursor = connection.cursor()

    cursor.execute('SELECT * FROM airports')
    data = cursor.fetchall()

    connection.close()

    return data

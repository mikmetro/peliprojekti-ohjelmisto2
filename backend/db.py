import sqlite3

def create_connection():
    return sqlite3.connect('database.db')

def init_db():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS users (id TEXT, money INTEGER, airports TEXT, co_level INTEGER)')
    cursor.execute('CREATE INDEX IF NOT EXISTS id_index ON users (id)')

    cursor.execute('CREATE TABLE IF NOT EXISTS user_airports (id TEXT, oId TEXT, portId INTEGER, level INTEGER)')
    cursor.execute('CREATE INDEX IF NOT EXISTS id_index2 ON user_airports (id)')

    connection.commit()
    connection.close()

def create_user(id):
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO users (id, money, airports, co_level) VALUES (?, ?, ?, ?)', (id, 1000, '[]', 0))
    connection.commit()
    connection.close()
    return True
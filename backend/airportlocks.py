from user import User
from airport import Airport

class AirportLocks:
    def __init__(self):
        self.airports = {}

    def lock(self, user: User, airport: Airport):
        if user.id not in self.airports:
            self.airports[user.id] = set()

        self.airports[user.id].add(airport.airportId)
        return True

    def unlock(self, user: User, airport: Airport):
        if user.id not in self.airports:
            return False

        self.airports[user.id].discard(airport.airportId)

    def is_locked(self, user: User, airport: Airport) -> bool:
        if user.id not in self.airports:
            return False
        return airport.airportId in self.airports[user.id]

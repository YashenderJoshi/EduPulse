from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["edupulse"]

users_collection = db["users"]
admins_collection = db["admins"]
attendance_collection = db["attendance"]
fees_collection = db["fees"]
payments_collection = db["payments"]
leaves_collection = db["leaves"]
notifications_collection = db["notifications"]
timetable_collection = db["timetable"]
faculty_collection = db["faculty"]
transport_collection = db["transport"]  

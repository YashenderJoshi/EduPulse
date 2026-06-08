import pymongo
from datetime import datetime, timedelta
from app.auth import get_password_hash
from decouple import config

DATABASE_URL = config(
    "DATABASE_URL", default="mongodb://localhost:27017/edupulse"
)


def seed_data():
    client = pymongo.MongoClient(DATABASE_URL)
    db = client.edupulse

    # CLEAR OLD DATA
    db.users.delete_many({})
    db.admins.delete_many({})
    db.attendance.delete_many({})
    db.fees.delete_many({})
    db.leaves.delete_many({})
    db.notifications.delete_many({})
    db.timetable.delete_many({})
    db.faculty.delete_many({})
    db.transport.delete_many({})

    print("Old data cleared")

    # ================= USERS =================
    students = [
        {
            "name": "Yashender Joshi",
            "email": "yashenderkum2002@gmail.com",
            "studentId": "25347",
            "role": "student",
            "department": "CSE",
            "hashed_password": get_password_hash("Yash1234"),
            "created_at": datetime.now(),
        },
        {
            "name": "Surinder Loi",
            "email": "Surinderloi@gmail.com",
            "studentId": "25300",
            "role": "student",
            "department": "CSE",
            "hashed_password": get_password_hash("Surinder1234"),
            "created_at": datetime.now(),
        },
    ]

    admin = {
        "name": "Yashender",
        "email": "yashchaser@gmail.com",
        "role": "admin",
        "adminRole": "super-admin",
        "hashed_password": get_password_hash("Admin1234"),
        "created_at": datetime.now(),
    }

    db.users.insert_many(students)
    db.admins.insert_one(admin)

    print("Users inserted")

    # ================= ATTENDANCE =================
    attendance = []
    for i in range(200):
        attendance.append(
            {
                "studentId": "25347",
                "date": datetime.now() - timedelta(days=i % 30),
                "subject": "Mathematics",
                "status": "Present" if i % 5 != 0 else "Absent",
                "faculty": "Dr. Rajesh Kumar",
            }
        )
    db.attendance.insert_many(attendance)
    print("Attendance inserted")

    # ================= FEES =================
    fees = []
    for i in range(20):
        fees.append(
            {
                "studentId": "25347",
                "amount": 50000,
                "status": "Paid" if i % 3 == 0 else "Pending",
                "dueDate": datetime.now() + timedelta(days=30),
            }
        )
    db.fees.insert_many(fees)
    print("Fees inserted")

    # ================= LEAVES =================
    leaves = []
    for i in range(10):
        leaves.append(
            {
                "studentId": "25347",
                "reason": "Medical leave",
                "status": "Pending" if i % 2 == 0 else "Approved",
                "fromDate": datetime.now(),
                "toDate": datetime.now() + timedelta(days=3),
            }
        )
    db.leaves.insert_many(leaves)
    print("Leaves inserted")

    # ================= NOTIFICATIONS =================
    notifications = [
        {
            "title": "Exam Schedule Released",
            "content": "Mid semester exams start next week",
            "type": "Academic",
            "priority": "Medium",
            "date": datetime.now(),
        },
        {
            "title": "Fee Deadline",
            "content": "Last date to pay fees is 25th",
            "type": "Admin",
            "priority": "High",
            "date": datetime.now(),
        }
    ]
    db.notifications.insert_many(notifications)
    print("Notifications inserted")

    # ================= TIMETABLE =================
    timetable = [

        # MONDAY
        {
            "studentId": "25347",
            "day": "Monday",
            "subject": "Data Structures",
            "start_time": "09:00",
            "end_time": "10:00",
            "room": "CS-101",
            "faculty": "Dr. Rajesh Kumar",
            "type": "Theory"
        },
        {
            "studentId": "25347",
            "day": "Monday",
            "subject": "Operating Systems",
            "start_time": "10:00",
            "end_time": "11:00",
            "room": "CS-102",
            "faculty": "Prof. Mehta",
            "type": "Theory"
        },

        # TUESDAY
        {
            "studentId": "25347",
            "day": "Tuesday",
            "subject": "Database Systems",
            "start_time": "09:00",
            "end_time": "10:00",
            "room": "CS-103",
            "faculty": "Dr. Sharma",
            "type": "Theory"
        },
        {
            "studentId": "25347",
            "day": "Tuesday",
            "subject": "Database Lab",
            "start_time": "11:00",
            "end_time": "13:00",
            "room": "Lab-3",
            "faculty": "Dr. Sharma",
            "type": "Lab"
        },

        # WEDNESDAY
        {
            "studentId": "25347",
            "day": "Wednesday",
            "subject": "Computer Networks",
            "start_time": "09:00",
            "end_time": "10:00",
            "room": "CS-104",
            "faculty": "Dr. Verma",
            "type": "Theory"
        },

        # THURSDAY
        {
            "studentId": "25347",
            "day": "Thursday",
            "subject": "Software Engineering",
            "start_time": "10:00",
            "end_time": "11:00",
            "room": "CS-105",
            "faculty": "Prof. Singh",
            "type": "Theory"
        },

        # FRIDAY
        {
            "studentId": "25347",
            "day": "Friday",
            "subject": "AI & ML",
            "start_time": "09:00",
            "end_time": "10:00",
            "room": "CS-106",
            "faculty": "Dr. Kapoor",
            "type": "Theory"
        },
        {
            "studentId": "25347",
            "day": "Friday",
            "subject": "AI Lab",
            "start_time": "11:00",
            "end_time": "13:00",
            "room": "Lab-2",
            "faculty": "Dr. Kapoor",
            "type": "Lab"
        },
    ]

    db.timetable.insert_many(timetable)
    print("Timetable inserted")

    # ================= FACULTY =================
    faculty = [
        {
            "name": "Dr. Rajesh Kumar",
            "department": "CSE",
            "email": "rajesh.kumar@college.edu",
            "phone": "9876543210",
            "designation": "Professor"
        },
        {
            "name": "Prof. Mehta",
            "department": "CSE",
            "email": "mehta@college.edu",
            "phone": "9876500000",
            "designation": "Associate Professor"
        }
    ]
    db.faculty.insert_many(faculty)
    print("Faculty inserted")

    print("All data seeded successfully!")
    client.close()


if __name__ == "__main__":
    seed_data()
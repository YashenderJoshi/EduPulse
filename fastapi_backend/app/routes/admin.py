from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId

from app.auth import get_password_hash, get_current_user
from app.database import (
    users_collection,
    attendance_collection,
    fees_collection,
    leaves_collection,
    notifications_collection,
    timetable_collection,
    faculty_collection
)

router = APIRouter()


# ================= ADMIN AUTH CHECK =================
def admin_only(user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return user


# ================= ADMIN DASHBOARD =================
@router.get("/dashboard")
def admin_dashboard(user=Depends(admin_only)):

    total_students = users_collection.count_documents({"role": "student"})

    total_attendance = attendance_collection.count_documents({})
    present_count = attendance_collection.count_documents({"status": "Present"})
    absent_count = total_attendance - present_count

    pending_fees = fees_collection.count_documents({"status": "Pending"})
    paid_fees = fees_collection.count_documents({"status": "Paid"})

    pending_leaves = leaves_collection.count_documents({"status": "Pending"})
    total_notifications = notifications_collection.count_documents({})

    # 🔥 Low attendance students
    low_students = list(
        users_collection.find(
            {"attendance": {"$lt": 75}, "role": "student"},
            {"_id": 0, "name": 1, "studentId": 1, "attendance": 1}
        )
    )

    return {
        "students": total_students,

        # Attendance Analytics
        "attendance_present": present_count,
        "attendance_absent": absent_count,
        "attendance_percentage": (
            (present_count / total_attendance) * 100 if total_attendance > 0 else 0
        ),

        # Fees Analytics
        "fees_pending": pending_fees,
        "fees_paid": paid_fees,

        # Other stats
        "leaves": pending_leaves,
        "notifications": total_notifications,

        # 🔥 Insight Data
        "low_attendance_students": low_students
    }


# ================= ATTENDANCE MANAGEMENT =================
@router.get("/attendance")
def get_attendance(user=Depends(admin_only)):
    return list(attendance_collection.find({}, {"_id": 0}))


@router.post("/attendance")
def add_attendance(data: dict, user=Depends(admin_only)):
    attendance_collection.insert_one(data)
    return {"status": "Attendance added"}


# ================= FEES MANAGEMENT =================
@router.get("/fees")
def get_fees(user=Depends(admin_only)):
    return list(fees_collection.find({}, {"_id": 0}))


@router.post("/fees")
def add_fee(data: dict, user=Depends(admin_only)):
    fees_collection.insert_one(data)
    return {"status": "Fee added"}


# ================= LEAVES =================

@router.get("/leaves")
def get_leaves(user=Depends(admin_only)):

    leaves = list(leaves_collection.find())

    result = []

    for l in leaves:
        result.append({
            "id": str(l["_id"]),
            "studentId": l.get("studentId"),
            "studentName": l.get("studentName"),
            "reason": l.get("reason"),
            "fromDate": l.get("fromDate"),
            "toDate": l.get("toDate"),
            "description": l.get("description"),
            "status": l.get("status", "Pending"),
            "remarks": l.get("remarks", "")
        })

    return result


@router.put("/leaves/{leave_id}")
def update_leave_status(leave_id: str, data: dict, user=Depends(admin_only)):

    status = data.get("status")
    remarks = data.get("remarks", "")

    leaves_collection.update_one(
        {"_id": ObjectId(leave_id)},
        {
            "$set": {
                "status": status,
                "remarks": remarks
            }
        }
    )

    return {"message": "Leave updated"}

# ================= NOTIFICATIONS =================
@router.get("/notifications")
def get_notifications(user=Depends(admin_only)):
    return list(notifications_collection.find({}, {"_id": 0}))


@router.post("/notifications")
def add_notification(data: dict, user=Depends(admin_only)):
    notifications_collection.insert_one(data)
    return {"status": "Notification added"}


# ================= TIMETABLE =================
@router.get("/timetable")
def get_timetable(user=Depends(admin_only)):
    return list(timetable_collection.find({}, {"_id": 0}))


# ================= FACULTY =================
# ================= FACULTY =================

@router.get("/faculty")
def get_faculty(user=Depends(admin_only)):
    faculty = list(faculty_collection.find({}, {"_id": 0}))
    return faculty


@router.post("/faculty")
def add_faculty(data: dict, user=Depends(admin_only)):

    faculty = {
        "name": data.get("name"),
        "email": data.get("email"),
        "phone": data.get("phone"),
        "department": data.get("department"),
        "designation": data.get("designation"),
        "specialization": data.get("specialization"),
    }

    faculty_collection.insert_one(faculty)

    return {"message": "Faculty added successfully"}


# ================= STUDENT MANAGEMENT =================
@router.get("/students")
def get_students(user=Depends(admin_only)):

    students = list(users_collection.find({"role": "student"}))

    return [
        {
            "id": str(s["_id"]),
            "name": s["name"],
            "email": s["email"],
            "studentId": s.get("studentId"),
            "department": s.get("department"),
            "branch": s.get("branch", ""),
            "year": s.get("year", ""),
            "phone": s.get("phone", ""),
            "attendance": s.get("attendance", 0),
            "feesStatus": s.get("feesStatus", "Pending")
        }
        for s in students
    ]


@router.post("/students")
def add_student(data: dict, user=Depends(admin_only)):

    student = {
        "name": data["name"],
        "email": data["email"],
        "studentId": data["studentId"],
        "department": data.get("department"),
        "branch": data.get("branch"),
        "year": data.get("year"),
        "phone": data.get("phone"),
        "attendance": 100,
        "feesStatus": "Pending",
        "role": "student",
        "hashed_password": get_password_hash("Student123")
    }

    users_collection.insert_one(student)

    return {"message": "Student added"}


@router.delete("/students/{student_id}")
def delete_student(student_id: str, user=Depends(admin_only)):

    users_collection.delete_one({"_id": ObjectId(student_id)})

    return {"message": "Student deleted"}


@router.put("/students/{student_id}")
def update_student(student_id: str, data: dict, user=Depends(admin_only)):

    users_collection.update_one(
        {"_id": ObjectId(student_id)},
        {"$set": {
            "name": data.get("name"),
            "email": data.get("email"),
            "studentId": data.get("studentId"),
            "department": data.get("department"),
            "branch": data.get("branch"),
            "year": data.get("year"),
            "phone": data.get("phone")
        }}
    )

    return {"message": "Student updated successfully"}


# ================= ADMIN ATTENDANCE MONITOR =================
@router.get("/attendance-monitor")
def attendance_monitor(user=Depends(admin_only)):

    records = list(attendance_collection.find())

    total = len(records)

    present = sum(1 for r in records if r.get("status") == "Present")

    absent = total - present


    # LOW ATTENDANCE STUDENTS (<75%)

    low_students = list(
        users_collection.find(
            {"attendance": {"$lt": 75}, "role": "student"},
            {"_id": 0, "name": 1, "studentId": 1, "attendance": 1}
        )
    )


    return {
        "total_classes": total,
        "present": present,
        "absent": absent,
        "low_attendance_students": low_students
    }
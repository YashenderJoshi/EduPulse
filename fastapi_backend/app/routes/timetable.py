from fastapi import APIRouter, Depends
from app.database import timetable_collection
from app.auth import get_current_user
from collections import defaultdict

router = APIRouter()

# 🔥 Academic Day Order
DAY_ORDER = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]


@router.get("/timetable")
async def get_timetable(current_user=Depends(get_current_user)):

    if current_user["role"] != "student":
        return {"detail": "Students only"}

    student_id = current_user["studentId"]

    records = list(
        timetable_collection.find({"studentId": student_id})
    )

    theory_dict = defaultdict(list)
    lab_dict = defaultdict(list)

    for t in records:
        time_slot = f"{t['start_time']}-{t['end_time']}"

        period = {
            "time": time_slot,
            "subject": t["subject"],
            "faculty": t.get("faculty"),
            "room": t["room"],
        }

        if t.get("type") == "Lab":
            lab_dict[t["day"]].append(period)
        else:
            theory_dict[t["day"]].append(period)

    # ✅ Sort days properly (Monday → Sunday)
    theory = []
    labs = []

    for day in DAY_ORDER:
        if day in theory_dict:
            theory.append({
                "day": day,
                "periods": theory_dict[day]
            })

        if day in lab_dict:
            labs.append({
                "day": day,
                "periods": lab_dict[day]
            })

    return {
        "theory": theory,
        "labs": labs
    }


# ✅ ADMIN: Add timetable entry
@router.post("/timetable/admin")
async def create_timetable(data: dict, current_user=Depends(get_current_user)):

    if current_user["role"] != "admin":
        return {"detail": "Not authorized"}

    timetable_collection.insert_one(data)

    return {"message": "Timetable entry added"}
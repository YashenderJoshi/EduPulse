from fastapi import APIRouter, Depends, HTTPException
from app.database import attendance_collection
from app.auth import get_current_user

router = APIRouter()


# ================= GET STUDENT ATTENDANCE =================
@router.get("/attendance")
def get_attendance(current_user=Depends(get_current_user)):

    if current_user["role"] != "student":
        raise HTTPException(status_code=403, detail="Students only")

    records = list(
        attendance_collection.find(
            {"studentId": current_user["studentId"]},
            {"_id": 0}
        )
    )

    return records


# ================= ATTENDANCE ANALYTICS =================
@router.get("/attendance-analytics")
def attendance_analytics(current_user=Depends(get_current_user)):

    if current_user["role"] != "student":
        raise HTTPException(status_code=403, detail="Students only")

    records = list(
        attendance_collection.find(
            {"studentId": current_user["studentId"]},
            {"_id": 0}
        )
    )

    if not records:
        return {
            "percentage": 0,
            "present": 0,
            "absent": 0,
            "monthly": []
        }

    present = sum(1 for r in records if r.get("status") == "Present")
    total = len(records)

    percentage = round((present / total) * 100)

    monthly_map = {}

    for r in records:

        if "date" not in r:
            continue

        month = r["date"].strftime("%Y-%m")

        if month not in monthly_map:
            monthly_map[month] = {"present": 0, "total": 0}

        monthly_map[month]["total"] += 1

        if r.get("status") == "Present":
            monthly_map[month]["present"] += 1

    monthly = []

    for m, data in monthly_map.items():

        if data["total"] == 0:
            continue

        monthly.append({
            "month": m,
            "percentage": round((data["present"] / data["total"]) * 100)
        })

    monthly.sort(key=lambda x: x["month"])

    return {
        "percentage": percentage,
        "present": present,
        "absent": total - present,
        "monthly": monthly
    }
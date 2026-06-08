from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from bson import ObjectId

from app.auth import get_current_user
from app.database import leaves_collection, users_collection

router = APIRouter()

# =========================
# STUDENT - GET MY LEAVES
# =========================
@router.get("/leaves")
async def get_my_leaves(current_user=Depends(get_current_user)):

    if current_user["role"] != "student":
        raise HTTPException(status_code=403, detail="Not allowed")

    leaves = list(
        leaves_collection.find(
            {"studentId": current_user["studentId"]}
        )
    )

    result = []

    for l in leaves:
        result.append({
            "_id": str(l["_id"]),
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


# =========================
# STUDENT - APPLY LEAVE
# =========================
@router.post("/leaves")
async def apply_leave(data: dict, current_user=Depends(get_current_user)):

    if current_user["role"] != "student":
        raise HTTPException(status_code=403, detail="Not allowed")

    leave = {
        "studentId": current_user["studentId"],
        "studentName": current_user["name"],
        "reason": data["reason"],
        "fromDate": data["fromDate"],
        "toDate": data["toDate"],
        "description": data.get("description", ""),
        "status": "Pending",
        "remarks": "",
        "createdAt": datetime.utcnow()
    }

    leaves_collection.insert_one(leave)

    return {"message": "Leave applied successfully"}
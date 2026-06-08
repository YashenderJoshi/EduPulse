from fastapi import APIRouter, Depends, HTTPException
from app.auth import get_current_user
from app.database import (
    attendance_collection,
    fees_collection,
    leaves_collection,
    notifications_collection
)

router = APIRouter()


@router.get("/dashboard")
def student_dashboard(current_user=Depends(get_current_user)):

    if current_user["role"] != "student":
        raise HTTPException(status_code=403, detail="Students only")

    student_id = current_user["studentId"]

    # Count Pending Fees
    pending_fees = fees_collection.count_documents({
        "studentId": student_id,
        "status": "Pending"
    })

    # Count Pending Leaves
    pending_leaves = leaves_collection.count_documents({
        "studentId": student_id,
        "status": "Pending"
    })

    # Latest Notifications
    notifications = list(
        notifications_collection
        .find({}, {"_id": 0})
        .sort("date", -1)
        .limit(5)
    )

    return {
        "pendingFees": pending_fees,
        "pendingLeaves": pending_leaves,
        "notifications": notifications
    }
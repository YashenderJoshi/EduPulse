from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from bson import ObjectId

from app.database import notifications_collection
from app.auth import get_current_user

router = APIRouter()

# =========================
# GET Notifications (Student)
# =========================
@router.get("/notifications")
def get_notifications(current_user=Depends(get_current_user)):

    notifications = list(notifications_collection.find())

    result = []

    for n in notifications:
        result.append({
            "_id": str(n["_id"]),
            "title": n.get("title"),
            "content": n.get("content"),
            "type": n.get("type"),
            "priority": n.get("priority"),
            "date": n.get("date")
        })

    return result


# =========================
# CREATE Notification (Admin)
# =========================
@router.post("/notifications")
def create_notification(data: dict, current_user=Depends(get_current_user)):

    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    notification = {
        "title": data["title"],
        "content": data["content"],
        "type": data.get("type", "Admin"),
        "priority": data.get("priority", "Medium"),
        "targetAudience": data.get("targetAudience", "All Students"),
        "date": datetime.utcnow()
    }

    notifications_collection.insert_one(notification)

    return {"message": "Notification created"}
from fastapi import APIRouter, Depends
from app.database import faculty_collection
from app.auth import get_current_user

router = APIRouter()


@router.get("/faculty")
def get_faculty(current_user=Depends(get_current_user)):

    faculty = list(
        faculty_collection.find({}, {"_id": 0})
    )

    return faculty
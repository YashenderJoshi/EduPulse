from fastapi import APIRouter, HTTPException
from app.database import users_collection, admins_collection
from app.auth import (
    get_password_hash,
    verify_password,
    create_access_token,
)

router = APIRouter()


# ================= STUDENT REGISTER =================
@router.post("/student/register")
async def register_student(data: dict):

    if users_collection.find_one({"email": data["email"]}):
        raise HTTPException(status_code=400, detail="Email already registered")

    user = {
        "name": data["name"],
        "email": data["email"],
        "hashed_password": get_password_hash(data["password"]),
        "role": "student",
        "studentId": data["studentId"],
        "department": data.get("department"),
    }

    users_collection.insert_one(user)

    return {"message": "Student registered successfully"}


# ================= ADMIN REGISTER =================
@router.post("/admin/register")
async def register_admin(data: dict):

    if admins_collection.find_one({"email": data["email"]}):
        raise HTTPException(status_code=400, detail="Admin already exists")

    admin = {
        "name": data["name"],
        "email": data["email"],
        "hashed_password": get_password_hash(data["password"]),
        "role": "admin",
        "adminRole": data["adminRole"],
    }

    admins_collection.insert_one(admin)

    return {"message": "Admin registered successfully"}


# ================= UNIVERSAL LOGIN =================
@router.post("/login")
async def login(data: dict):

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")

    # STUDENT LOGIN
    user = users_collection.find_one({"email": email})

    if user:
        if not verify_password(password, user["hashed_password"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        token = create_access_token({"sub": str(user["_id"])})

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": str(user["_id"]),
                "name": user["name"],
                "role": "student",
                "studentId": user.get("studentId"),
                "department": user.get("department"),
            },
        }

    # ADMIN LOGIN
    admin = admins_collection.find_one({"email": email})

    if admin:
        if not verify_password(password, admin["hashed_password"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        token = create_access_token({"sub": str(admin["_id"])})

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": str(admin["_id"]),
                "name": admin["name"],
                "role": "admin",
                "adminRole": admin.get("adminRole", "super-admin"),
            },
        }

    raise HTTPException(status_code=401, detail="Invalid email or password")
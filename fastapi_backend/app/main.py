from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ROUTERS
from app.routes.auth import router as auth_router
from app.routes.students import router as students_router
from app.routes.attendance import router as attendance_router
from app.routes.admin import router as admin_router
from app.routes.notifications import router as notifications_router
from app.routes.fees import router as fees_router
from app.routes.leaves import router as leaves_router
from app.routes.timetable import router as timetable_router
from app.routes.faculty import router as faculty_router


app = FastAPI()


# ✅ HEALTH CHECK (VERY IMPORTANT)
@app.get("/ping")
async def ping():
    return {"message": "Backend is alive"}


# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ================= AUTH =================
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])

# ================= STUDENT =================
app.include_router(students_router, prefix="/api/students", tags=["Students"])

# ================= ATTENDANCE =================
app.include_router(attendance_router, prefix="/api/students", tags=["Attendance"])

# ================= FEES =================
app.include_router(fees_router, prefix="/api/students", tags=["Fees"])

# ================= LEAVES =================
app.include_router(leaves_router, prefix="/api/students", tags=["Leaves"])

# ================= NOTIFICATIONS =================
app.include_router(notifications_router, prefix="/api/students", tags=["Notifications"])

# ================= TIMETABLE =================
app.include_router(timetable_router, prefix="/api/students", tags=["Timetable"])

# ================= FACULTY =================
app.include_router(faculty_router, prefix="/api/students", tags=["Faculty"])

# ================= ADMIN =================
app.include_router(admin_router, prefix="/api/admin", tags=["Admin"])
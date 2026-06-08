from pydantic import BaseModel, EmailStr, validator
from typing import List, Optional
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    STUDENT = "student"
    ADMIN = "admin"


class AdminRole(str, Enum):
    SUPER_ADMIN = "super-admin"
    FACULTY_ADMIN = "faculty-admin"
    FINANCE_ADMIN = "finance-admin"
    TRANSPORT_ADMIN = "transport-admin"


class AttendanceStatus(str, Enum):
    PRESENT = "Present"
    ABSENT = "Absent"


class FeeStatus(str, Enum):
    PAID = "Paid"
    PENDING = "Pending"


class LeaveStatus(str, Enum):
    PENDING = "Pending"
    APPROVED = "Approved"
    REJECTED = "Rejected"


class NotificationType(str, Enum):
    EXAM = "Exam"
    ADMIN = "Admin"
    FEE = "Fee"
    GENERAL = "General"
    ACADEMIC = "Academic"


class NotificationPriority(str, Enum):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class Department(str, Enum):
    COMPUTER_SCIENCE = "Computer Science"
    ELECTRICAL = "Electrical"
    MECHANICAL = "Mechanical"
    CIVIL = "Civil"
    ELECTRONICS = "Electronics"
    CHEMICAL = "Chemical"


class Branch(str, Enum):
    CSE = "CSE"
    EE = "EE"
    ME = "ME"
    CE = "CE"
    ECE = "ECE"
    CHE = "ChE"


class UserBase(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: UserRole


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.STUDENT
    studentId: Optional[str] = None
    department: Optional[Department] = None
    branch: Optional[Branch] = None
    year: Optional[int] = None
    phone: Optional[str] = None
    adminRole: Optional[AdminRole] = None

    @validator('year')
    def year_must_be_valid(cls, v):
        if v is not None and (v < 1 or v > 4):
            raise ValueError('Year must be between 1 and 4')
        return v


class User(UserBase):
    studentId: Optional[str] = None
    department: Optional[Department] = None
    branch: Optional[Branch] = None
    year: Optional[int] = None
    phone: Optional[str] = None
    adminRole: Optional[AdminRole] = None
    avatar: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class UserInDB(User):
    hashed_password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class AttendanceBase(BaseModel):
    studentId: str
    date: datetime
    subject: str
    status: AttendanceStatus


class AttendanceCreate(AttendanceBase):
    pass


class Attendance(AttendanceBase):
    id: str
    created_at: Optional[datetime] = None


class FeeBase(BaseModel):
    studentId: str
    type: str
    amount: float
    status: FeeStatus
    dueDate: datetime
    paidDate: Optional[datetime] = None


class FeeCreate(FeeBase):
    pass


class Fee(FeeBase):
    id: str
    created_at: Optional[datetime] = None


class LeaveBase(BaseModel):
    studentId: str
    reason: str
    fromDate: datetime
    toDate: datetime
    status: LeaveStatus = LeaveStatus.PENDING
    remarks: Optional[str] = None

    @validator('toDate')
    def to_date_must_be_after_from_date(cls, v, values):
        if 'fromDate' in values and v <= values['fromDate']:
            raise ValueError('To date must be after from date')
        return v

    @validator('fromDate')
    def from_date_must_not_be_past(cls, v):
        if v < datetime.now().replace(hour=0, minute=0, second=0, microsecond=0):
            raise ValueError('From date cannot be in the past')
        return v


class LeaveCreate(LeaveBase):
    pass


class Leave(LeaveBase):
    id: str
    created_at: Optional[datetime] = None


class NotificationBase(BaseModel):
    title: str
    content: str
    type: NotificationType
    priority: NotificationPriority
    date: datetime
    targetUsers: Optional[List[str]] = None


class NotificationCreate(NotificationBase):
    pass


class Notification(NotificationBase):
    id: str
    created_at: Optional[datetime] = None


class Period(BaseModel):
    time: str
    subject: str
    faculty: str
    room: str


class TimetableBase(BaseModel):
    day: str
    periods: List[Period]


class TimetableCreate(TimetableBase):
    pass


class Timetable(TimetableBase):
    id: str
    created_at: Optional[datetime] = None


class FacultyBase(BaseModel):
    id: str
    name: str
    department: Department
    email: EmailStr
    phone: str
    designation: str
    specialization: str


class FacultyCreate(FacultyBase):
    pass


class Faculty(FacultyBase):
    created_at: Optional[datetime] = None


class TransportBase(BaseModel):
    id: str
    routeName: str
    driver: str
    stops: List[str]
    timing: str
    fare: float


class TransportCreate(TransportBase):
    pass


class Transport(TransportBase):
    created_at: Optional[datetime] = None


# Response models
class DashboardStats(BaseModel):
    students: int
    faculty: int
    transportRoutes: int
    pendingLeaves: int
    totalFeesAmount: float
    paidFeesAmount: float


class StudentDashboard(BaseModel):
    attendance: dict
    fees: dict
    leaves: dict
    notifications: List[Notification]


class StudentWithDetails(BaseModel):
    student: User
    attendance: List[Attendance]
    fees: List[Fee]
    leaves: List[Leave]


class PaginatedResponse(BaseModel):
    data: List[dict]
    pagination: dict


class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None
    error: Optional[str] = None

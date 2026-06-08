from pydantic import BaseModel
from typing import Optional

class TimetableCreate(BaseModel):
    day: str          # Monday, Tuesday, etc.
    subject: str
    start_time: str   # "09:00"
    end_time: str     # "10:00"
    room: str
    faculty: Optional[str] = None


class TimetableOut(BaseModel):
    id: str
    day: str
    subject: str
    start_time: str
    end_time: str
    room: str
    faculty: Optional[str]

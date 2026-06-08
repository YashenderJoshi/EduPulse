from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NotificationCreate(BaseModel):
    title: str
    content: str
    type: str        # Academic | Admin | Exam
    priority: str    # Low | Medium | High

class NotificationOut(BaseModel):
    id: str
    title: str
    content: str
    type: str
    priority: str
    date: datetime

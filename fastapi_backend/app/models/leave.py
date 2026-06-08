from datetime import date
from app.models.base import MongoBaseModel

class Fee(MongoBaseModel):
    studentId: str
    type: str
    amount: int
    status: str
    dueDate: date

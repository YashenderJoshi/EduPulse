from datetime import date
from app.models.base import MongoBaseModel

class Leave(MongoBaseModel):
    studentId: str
    reason: str
    fromDate: date
    toDate: date
    status: str

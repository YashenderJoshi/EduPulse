from app.models.base import MongoBaseModel

class Faculty(MongoBaseModel):
    name: str
    department: str
    email: str
    phone: str
    designation: str

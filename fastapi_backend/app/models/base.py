from pydantic import BaseModel, Field
from typing import Optional

class MongoBaseModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from datetime import datetime
import uuid
import csv
from fastapi.responses import StreamingResponse
import io

from app.auth import get_current_user
from app.database import fees_collection, payments_collection

router = APIRouter()

# =========================
# STUDENT - GET FEES
# =========================

@router.get("/fees")
async def get_student_fees(current_user=Depends(get_current_user)):

    if current_user["role"] != "student":
        raise HTTPException(status_code=403, detail="Not allowed")

    fees = list(
        fees_collection.find(
            {"studentId": current_user["studentId"]}
        )
    )

    result = []

    for f in fees:
        result.append({
            "id": str(f["_id"]),
            "type": f.get("type", "Tuition Fee"),
            "amount": f["amount"],
            "dueDate": f["dueDate"],
            "status": f["status"],
            "paidDate": f.get("paidDate"),
            "transactionId": f.get("transactionId")
        })

    return result


# =========================
# STUDENT - PAY FEE
# =========================

@router.post("/fees/pay/{fee_id}")
async def pay_fee(fee_id: str, current_user=Depends(get_current_user)):

    if current_user["role"] != "student":
        raise HTTPException(status_code=403, detail="Not allowed")

    fee = fees_collection.find_one({"_id": ObjectId(fee_id)})

    if not fee:
        raise HTTPException(status_code=404, detail="Fee not found")

    if fee["status"] == "Paid":
        raise HTTPException(status_code=400, detail="Already paid")

    transaction_id = "TXN-" + uuid.uuid4().hex[:10].upper()
    now = datetime.now()

    fees_collection.update_one(
        {"_id": ObjectId(fee_id)},
        {
            "$set": {
                "status": "Paid",
                "paidDate": now,
                "transactionId": transaction_id
            }
        }
    )

    payments_collection.insert_one({
        "studentId": current_user["studentId"],
        "feeId": fee_id,
        "type": fee.get("type", "Tuition Fee"),
        "amount": fee["amount"],
        "transactionId": transaction_id,
        "paidDate": now,
        "status": "Pending"
    })

    return {
        "message": "Payment successful",
        "transactionId": transaction_id
    }


# =========================
# ADMIN - GET PAYMENT REQUESTS
# =========================

@router.get("/admin/payments")
async def get_payment_requests(current_user=Depends(get_current_user)):

    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    payments = list(payments_collection.find())

    result = []

    for p in payments:
        result.append({
            "id": str(p["_id"]),
            "studentId": p["studentId"],
            "amount": p["amount"],
            "type": p["type"],
            "transactionId": p["transactionId"],
            "status": p.get("status", "Pending"),
            "paidDate": p.get("paidDate")
        })

    return result


# =========================
# ADMIN - APPROVE PAYMENT
# =========================

@router.put("/admin/payments/{payment_id}/approve")
async def approve_payment(payment_id: str, current_user=Depends(get_current_user)):

    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    payments_collection.update_one(
        {"_id": ObjectId(payment_id)},
        {"$set": {"status": "Approved"}}
    )

    return {"message": "Payment approved"}


# =========================
# ADMIN - REJECT PAYMENT
# =========================

@router.put("/admin/payments/{payment_id}/reject")
async def reject_payment(payment_id: str, current_user=Depends(get_current_user)):

    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    payments_collection.update_one(
        {"_id": ObjectId(payment_id)},
        {"$set": {"status": "Rejected"}}
    )

    return {"message": "Payment rejected"}


# =========================
# ADMIN - EXPORT REPORT
# =========================

@router.get("/admin/payments/export")
async def export_report(current_user=Depends(get_current_user)):

    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    payments = list(payments_collection.find())

    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow([
        "Student ID",
        "Type",
        "Amount",
        "Transaction ID",
        "Status"
    ])

    for p in payments:
        writer.writerow([
            p["studentId"],
            p["type"],
            p["amount"],
            p["transactionId"],
            p.get("status", "Pending")
        ])

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=fees_report.csv"
        }
    )
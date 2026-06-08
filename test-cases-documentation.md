# EduPulse Backend Test Cases Documentation

## Overview

This document provides comprehensive documentation of all test cases for the EduPulse backend API, including input parameters, expected outputs, and test scenarios.

## Test Suites Summary

-   **Total Test Suites**: 2
-   **Total Tests**: 37
-   **All Tests Status**: ✅ PASSED

### Test Suite Breakdown

1. **API Tests** (`api.test.ts`): 13 tests covering authentication and student endpoints
2. **Admin Tests** (`admin.test.ts`): 24 tests covering all admin functionality

---

## 1. Authentication Endpoints Test Cases

### 1.1 POST /api/auth/student/register

#### Test Case 1.1.1: Successful Student Registration

**Input:**

```json
{
    "studentId": "STU001",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123",
    "department": "Computer Science",
    "branch": "CSE",
    "year": 3,
    "phone": "+1234567890"
}
```

**Expected Output:**

```json
{
    "token": "jwt_token_here",
    "user": {
        "id": "STU001",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "student",
        "studentId": "STU001",
        "department": "Computer Science",
        "branch": "CSE"
    }
}
```

**Status Code:** 201
**Test Status:** ✅ PASSED

#### Test Case 1.1.2: Duplicate Email Registration

**Input:**

```json
{
    "studentId": "STU002",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123",
    "department": "Computer Science",
    "branch": "CSE",
    "year": 3,
    "phone": "+1234567890"
}
```

**Expected Output:**

```json
{
    "message": "User already exists"
}
```

**Status Code:** 400
**Test Status:** ✅ PASSED

#### Test Case 1.1.3: Validation Error - Missing Required Fields

**Input:**

```json
{}
```

**Expected Output:**

```json
{
    "errors": [
        {
            "msg": "Student ID is required",
            "param": "studentId",
            "location": "body"
        }
    ]
}
```

**Status Code:** 400
**Test Status:** ✅ PASSED

### 1.2 POST /api/auth/student/login

#### Test Case 1.2.1: Successful Student Login

**Input:**

```json
{
    "studentId": "STU001",
    "department": "Computer Science",
    "branch": "CSE",
    "password": "Password123"
}
```

**Expected Output:**

```json
{
    "token": "jwt_token_here",
    "user": {
        "id": "STU001",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "student",
        "studentId": "STU001",
        "department": "Computer Science",
        "branch": "CSE"
    }
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 1.2.2: Invalid Credentials Login

**Input:**

```json
{
    "studentId": "STU001",
    "department": "Computer Science",
    "branch": "CSE",
    "password": "WrongPassword"
}
```

**Expected Output:**

```json
{
    "message": "Invalid credentials"
}
```

**Status Code:** 401
**Test Status:** ✅ PASSED

### 1.3 GET /api/auth/me

#### Test Case 1.3.1: Get Current User Profile

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Expected Output:**

```json
{
    "user": {
        "id": "STU001",
        "studentId": "STU001",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "student",
        "department": "Computer Science",
        "branch": "CSE",
        "year": 3,
        "phone": "+1234567890"
    }
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 1.3.2: Missing Token

**Headers:** None

**Expected Output:**

```json
{
    "message": "No token provided"
}
```

**Status Code:** 401
**Test Status:** ✅ PASSED

#### Test Case 1.3.3: Invalid Token

**Headers:**

```
Authorization: Bearer invalid_token
```

**Expected Output:**

```json
{
    "message": "Invalid token"
}
```

**Status Code:** 401
**Test Status:** ✅ PASSED

---

## 2. Health Check Endpoints Test Cases

### 2.1 GET /api/health

#### Test Case 2.1.1: Health Check

**Expected Output:**

```json
{
    "success": true,
    "message": "Health check completed",
    "data": {
        "status": "OK",
        "timestamp": "2024-01-15T10:30:00.000Z",
        "database": "Connected",
        "uptime": 123.456,
        "memory": {
            "rss": 50000000,
            "heapTotal": 30000000,
            "heapUsed": 20000000,
            "external": 1000000
        },
        "version": "v18.17.0"
    }
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

### 2.2 GET /api/health/database

#### Test Case 2.2.1: Database Health Check

**Expected Output:**

```json
{
    "success": true,
    "message": "Database health check completed",
    "data": {
        "status": "connected",
        "db": "edupulse",
        "collections": 8,
        "indexes": 24
    }
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

---

## 3. Student Endpoints Test Cases

### 3.1 GET /api/students/profile

#### Test Case 3.1.1: Get Student Profile

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Expected Output:**

```json
{
    "user": {
        "id": "STU001",
        "studentId": "STU001",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "student",
        "department": "Computer Science",
        "branch": "CSE",
        "year": 3,
        "phone": "+1234567890"
    }
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 3.1.2: Unauthorized Access

**Headers:** None

**Expected Output:**

```json
{
    "message": "No token provided"
}
```

**Status Code:** 401
**Test Status:** ✅ PASSED

### 3.2 GET /api/students/dashboard

#### Test Case 3.2.1: Get Student Dashboard

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Expected Output:**

```json
{
    "attendance": {
        "total": 10,
        "present": 8,
        "percentage": 80
    },
    "fees": {
        "pending": 2,
        "totalAmount": 25000
    },
    "leaves": {
        "pending": 1
    },
    "notifications": [
        {
            "id": "notif001",
            "title": "Exam Notification",
            "content": "Exam scheduled for tomorrow",
            "type": "Exam",
            "priority": "High",
            "date": "2024-01-15T00:00:00.000Z"
        }
    ]
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

---

## 4. Admin Endpoints Test Cases

### 4.1 GET /api/admin/dashboard

#### Test Case 4.1.1: Get Admin Dashboard Statistics

**Headers:**

```
Authorization: Bearer admin_jwt_token
```

**Expected Output:**

```json
{
    "students": 150,
    "faculty": 25,
    "transportRoutes": 8,
    "pendingLeaves": 12,
    "totalFeesAmount": 500000,
    "paidFeesAmount": 350000
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 4.1.2: Non-Admin Access Denied

**Headers:**

```
Authorization: Bearer student_jwt_token
```

**Expected Output:**

```json
{
    "message": "Not authorized"
}
```

**Status Code:** 403
**Test Status:** ✅ PASSED

### 4.2 Student Management

#### Test Case 4.2.1: GET /api/admin/students - Get All Students with Pagination

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Query Parameters:**

```
page=1&limit=10
```

**Expected Output:**

```json
{
    "students": [
        {
            "id": "STU001",
            "studentId": "STU001",
            "name": "John Doe",
            "email": "john@example.com",
            "department": "Computer Science",
            "branch": "CSE",
            "year": 3,
            "phone": "+1234567890"
        }
    ],
    "pagination": {
        "current": 1,
        "pages": 15,
        "total": 150
    }
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 4.2.2: GET /api/admin/students - Filter by Department

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Query Parameters:**

```
department=Computer Science
```

**Expected Output:**

```json
{
    "students": [
        {
            "id": "STU001",
            "studentId": "STU001",
            "name": "John Doe",
            "email": "john@example.com",
            "department": "Computer Science",
            "branch": "CSE",
            "year": 3,
            "phone": "+1234567890"
        }
    ],
    "pagination": {
        "current": 1,
        "pages": 3,
        "total": 25
    }
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 4.2.3: POST /api/admin/students - Create New Student

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Input:**

```json
{
    "studentId": "STU002",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "Password123",
    "department": "Computer Science",
    "branch": "CSE",
    "year": 2,
    "phone": "+1234567891"
}
```

**Expected Output:**

```json
{
    "message": "Student created successfully",
    "student": {
        "id": "STU002",
        "studentId": "STU002",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "student",
        "department": "Computer Science",
        "branch": "CSE",
        "year": 2,
        "phone": "+1234567891"
    }
}
```

**Status Code:** 201
**Test Status:** ✅ PASSED

#### Test Case 4.2.4: POST /api/admin/students - Validation Error

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Input:**

```json
{}
```

**Expected Output:**

```json
{
    "errors": [
        {
            "msg": "Student ID is required",
            "param": "studentId",
            "location": "body"
        }
    ]
}
```

**Status Code:** 400
**Test Status:** ✅ PASSED

#### Test Case 4.2.5: PUT /api/admin/students/:id - Update Student

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Input:**

```json
{
    "name": "John Updated",
    "phone": "+1234567899"
}
```

**Expected Output:**

```json
{
    "id": "STU001",
    "studentId": "STU001",
    "name": "John Updated",
    "email": "john@example.com",
    "role": "student",
    "department": "Computer Science",
    "branch": "CSE",
    "year": 3,
    "phone": "+1234567899"
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

### 4.3 Attendance Management

#### Test Case 4.3.1: GET /api/admin/attendance - Get Attendance Records

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Expected Output:**

```json
[
    {
        "id": "att001",
        "studentId": "STU001",
        "date": "2024-01-15T00:00:00.000Z",
        "subject": "Mathematics",
        "status": "Present"
    }
]
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 4.3.2: POST /api/admin/attendance - Mark Attendance

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Input:**

```json
{
    "studentId": "STU001",
    "date": "2024-01-15",
    "subject": "Mathematics",
    "status": "Present"
}
```

**Expected Output:**

```json
{
    "id": "att001",
    "studentId": "STU001",
    "date": "2024-01-15T00:00:00.000Z",
    "subject": "Mathematics",
    "status": "Present"
}
```

**Status Code:** 201
**Test Status:** ✅ PASSED

#### Test Case 4.3.3: POST /api/admin/attendance/bulk - Bulk Attendance Update

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Input:**

```json
{
    "attendanceList": [
        {
            "studentId": "STU001",
            "date": "2024-01-15",
            "subject": "Mathematics",
            "status": "Present"
        }
    ]
}
```

**Expected Output:**

```json
{
    "message": "Bulk attendance updated successfully"
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

### 4.4 Fee Management

#### Test Case 4.4.1: GET /api/admin/fees - Get Fee Records

**Headers:**

```
Authorization: Bearer finance_admin_jwt_token
```

**Expected Output:**

```json
[
    {
        "id": "fee001",
        "studentId": "STU001",
        "type": "Semester Fee",
        "amount": 25000,
        "status": "Pending",
        "dueDate": "2024-01-31T00:00:00.000Z"
    }
]
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 4.4.2: POST /api/admin/fees - Create Fee Record

**Headers:**

```
Authorization: Bearer finance_admin_jwt_token
```

**Input:**

```json
{
    "studentId": "STU001",
    "type": "Exam Fee",
    "amount": 5000,
    "dueDate": "2024-02-01"
}
```

**Expected Output:**

```json
{
    "id": "fee002",
    "studentId": "STU001",
    "type": "Exam Fee",
    "amount": 5000,
    "status": "Pending",
    "dueDate": "2024-02-01T00:00:00.000Z"
}
```

**Status Code:** 201
**Test Status:** ✅ PASSED

### 4.5 Leave Management

#### Test Case 4.5.1: GET /api/admin/leaves - Get Leave Requests

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Expected Output:**

```json
[
    {
        "id": "leave001",
        "studentId": "STU001",
        "reason": "Medical",
        "fromDate": "2024-01-20T00:00:00.000Z",
        "toDate": "2024-01-22T00:00:00.000Z",
        "status": "Pending"
    }
]
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 4.5.2: PUT /api/admin/leaves/:id - Approve Leave Request

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Input:**

```json
{
    "status": "Approved"
}
```

**Expected Output:**

```json
{
    "id": "leave001",
    "studentId": "STU001",
    "reason": "Medical",
    "fromDate": "2024-01-20T00:00:00.000Z",
    "toDate": "2024-01-22T00:00:00.000Z",
    "status": "Approved"
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

### 4.6 Notification Management

#### Test Case 4.6.1: GET /api/admin/notifications - Get All Notifications

**Headers:**

```
Authorization: Bearer admin_jwt_token
```

**Expected Output:**

```json
[
    {
        "id": "notif001",
        "title": "Test Notification",
        "content": "This is a test notification",
        "type": "General",
        "priority": "Medium",
        "date": "2024-01-15T00:00:00.000Z"
    }
]
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 4.6.2: POST /api/admin/notifications - Create Notification

**Headers:**

```
Authorization: Bearer admin_jwt_token
```

**Input:**

```json
{
    "title": "Test Notification",
    "content": "This is a test notification",
    "type": "General",
    "priority": "Medium"
}
```

**Expected Output:**

```json
{
    "id": "notif001",
    "title": "Test Notification",
    "content": "This is a test notification",
    "type": "General",
    "priority": "Medium",
    "date": "2024-01-15T00:00:00.000Z"
}
```

**Status Code:** 201
**Test Status:** ✅ PASSED

### 4.7 Timetable Management

#### Test Case 4.7.1: GET /api/admin/timetable - Get Timetable

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Expected Output:**

```json
[
    {
        "id": "tt001",
        "day": "Monday",
        "periods": [
            {
                "time": "9:00-10:00",
                "subject": "Mathematics",
                "faculty": "Dr. Smith",
                "room": "CS-101"
            }
        ]
    }
]
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 4.7.2: POST /api/admin/timetable - Create Timetable Entry

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Input:**

```json
{
    "day": "Monday",
    "periods": [
        {
            "time": "9:00-10:00",
            "subject": "Mathematics",
            "faculty": "Dr. Smith",
            "room": "CS-101"
        }
    ]
}
```

**Expected Output:**

```json
{
    "id": "tt001",
    "day": "Monday",
    "periods": [
        {
            "time": "9:00-10:00",
            "subject": "Mathematics",
            "faculty": "Dr. Smith",
            "room": "CS-101"
        }
    ]
}
```

**Status Code:** 201
**Test Status:** ✅ PASSED

### 4.8 Faculty Management

#### Test Case 4.8.1: GET /api/admin/faculty - Get All Faculty

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Expected Output:**

```json
[
    {
        "id": "FAC001",
        "name": "Dr. Smith",
        "department": "Computer Science",
        "email": "smith@edupulse.edu",
        "phone": "+1234567890",
        "designation": "Professor",
        "specialization": "Data Structures"
    }
]
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 4.8.2: POST /api/admin/faculty - Create Faculty Member

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Input:**

```json
{
    "id": "FAC002",
    "name": "Dr. Johnson",
    "department": "Computer Science",
    "email": "johnson@edupulse.edu",
    "phone": "+1234567892",
    "designation": "Associate Professor",
    "specialization": "Algorithms"
}
```

**Expected Output:**

```json
{
    "id": "FAC002",
    "name": "Dr. Johnson",
    "department": "Computer Science",
    "email": "johnson@edupulse.edu",
    "phone": "+1234567892",
    "designation": "Associate Professor",
    "specialization": "Algorithms"
}
```

**Status Code:** 201
**Test Status:** ✅ PASSED

### 4.9 Transport Management

#### Test Case 4.9.1: GET /api/admin/transport - Get All Transport Routes

**Headers:**

```
Authorization: Bearer transport_admin_jwt_token
```

**Expected Output:**

```json
[
    {
        "id": "TRANS001",
        "routeName": "Route 1",
        "driver": "Driver 1",
        "stops": ["Stop 1", "Stop 2"],
        "timing": "7:00 AM",
        "fare": 1000
    }
]
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 4.9.2: POST /api/admin/transport - Create Transport Route

**Headers:**

```
Authorization: Bearer transport_admin_jwt_token
```

**Input:**

```json
{
    "id": "TRANS002",
    "routeName": "Route 2",
    "driver": "Driver 2",
    "stops": ["Stop A", "Stop B", "Stop C"],
    "timing": "8:00 AM",
    "fare": 1200
}
```

**Expected Output:**

```json
{
    "id": "TRANS002",
    "routeName": "Route 2",
    "driver": "Driver 2",
    "stops": ["Stop A", "Stop B", "Stop C"],
    "timing": "8:00 AM",
    "fare": 1200
}
```

**Status Code:** 201
**Test Status:** ✅ PASSED

#### Test Case 4.9.3: PUT /api/admin/transport/:id - Update Transport Route

**Headers:**

```
Authorization: Bearer transport_admin_jwt_token
```

**Input:**

```json
{
    "fare": 1600,
    "driver": "Driver 2 Updated"
}
```

**Expected Output:**

```json
{
    "id": "TRANS002",
    "routeName": "Route 2",
    "driver": "Driver 2 Updated",
    "stops": ["Stop A", "Stop B", "Stop C"],
    "timing": "8:00 AM",
    "fare": 1600
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

#### Test Case 4.9.4: DELETE /api/admin/transport/:id - Delete Transport Route

**Headers:**

```
Authorization: Bearer transport_admin_jwt_token
```

**Expected Output:**

```json
{
    "message": "Transport route deleted successfully"
}
```

**Status Code:** 200
**Test Status:** ✅ PASSED

---

## Test Execution Summary

### Environment

-   **Node.js Version**: 18.x
-   **Database**: MongoDB (In-Memory for Tests)
-   **Testing Framework**: Jest
-   **HTTP Testing**: Supertest
-   **Database Testing**: MongoDB Memory Server

### Test Results

-   **Total Test Suites**: 2
-   **Total Tests**: 37
-   **Passed Tests**: 37
-   **Failed Tests**: 0
-   **Test Coverage**: Authentication, Student Portal, Admin Portal (Dashboard, Student Management, Attendance, Fees, Leaves, Notifications, Timetable, Faculty, Transport)

### Test Categories

1. **Authentication Tests**: User registration, login, token validation
2. **Authorization Tests**: Role-based access control
3. **CRUD Operations**: Create, Read, Update, Delete for all entities
4. **Validation Tests**: Input validation and error handling
5. **Business Logic Tests**: Dashboard statistics, bulk operations
6. **Health Check Tests**: System and database health monitoring

### Key Test Scenarios Covered

-   ✅ Successful API operations
-   ✅ Error handling and validation
-   ✅ Authentication and authorization
-   ✅ Role-based access control
-   ✅ Data integrity and constraints
-   ✅ Bulk operations
-   ✅ Edge cases and boundary conditions

---

_Generated on: 19 October 2025_
_Test Framework: Jest with Supertest_
_Database: MongoDB Memory Server_

# EduPulse Backend Error Scenarios Test Documentation

## Overview

This document details all error handling test cases implemented in the EduPulse backend test suite. Each error scenario includes the input conditions, expected error responses, and HTTP status codes.

## Error Test Cases Summary

**Total Error Test Cases:** 8  
**Error Categories Covered:**

-   Authentication Errors (4 cases)
-   Authorization Errors (2 cases)
-   Validation Errors (2 cases)

---

## 1. Authentication Error Scenarios

### 1.1 Duplicate User Registration

**Test Case:** `POST /api/auth/student/register` - Duplicate Email

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

**Expected Response:**

```json
{
    "message": "User already exists"
}
```

**HTTP Status:** 400 Bad Request  
**Error Type:** Business Logic Error  
**Test Status:** ✅ PASSED

### 1.2 Invalid Login Credentials

**Test Case:** `POST /api/auth/student/login` - Wrong Password

**Input:**

```json
{
    "studentId": "STU001",
    "department": "Computer Science",
    "branch": "CSE",
    "password": "WrongPassword"
}
```

**Expected Response:**

```json
{
    "message": "Invalid credentials"
}
```

**HTTP Status:** 401 Unauthorized  
**Error Type:** Authentication Error  
**Test Status:** ✅ PASSED

### 1.3 Missing Authentication Token

**Test Case:** `GET /api/auth/me` - No Token Provided

**Headers:** None

**Expected Response:**

```json
{
    "message": "No token provided"
}
```

**HTTP Status:** 401 Unauthorized  
**Error Type:** Authentication Error  
**Test Status:** ✅ PASSED

### 1.4 Invalid JWT Token

**Test Case:** `GET /api/auth/me` - Invalid Token

**Headers:**

```
Authorization: Bearer invalid_token_here
```

**Expected Response:**

```json
{
    "message": "Invalid token"
}
```

**HTTP Status:** 401 Unauthorized  
**Error Type:** Authentication Error  
**Test Status:** ✅ PASSED

---

## 2. Authorization Error Scenarios

### 2.1 Insufficient Admin Privileges

**Test Case:** `GET /api/admin/dashboard` - Student Accessing Admin Route

**Headers:**

```
Authorization: Bearer student_jwt_token
```

**Expected Response:**

```json
{
    "message": "Not authorized"
}
```

**HTTP Status:** 403 Forbidden  
**Error Type:** Authorization Error  
**Test Status:** ✅ PASSED

### 2.2 Unauthorized Student Profile Access

**Test Case:** `GET /api/students/profile` - No Authentication

**Headers:** None

**Expected Response:**

```json
{
    "message": "No token provided"
}
```

**HTTP Status:** 401 Unauthorized  
**Error Type:** Authorization Error  
**Test Status:** ✅ PASSED

---

## 3. Validation Error Scenarios

### 3.1 Missing Required Fields - Student Registration

**Test Case:** `POST /api/auth/student/register` - Empty Request Body

**Input:**

```json
{}
```

**Expected Response:**

```json
{
    "errors": [
        {
            "msg": "Student ID is required",
            "param": "studentId",
            "location": "body"
        },
        {
            "msg": "Name is required",
            "param": "name",
            "location": "body"
        },
        {
            "msg": "Email is required",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Password is required",
            "param": "password",
            "location": "body"
        },
        {
            "msg": "Department is required",
            "param": "department",
            "location": "body"
        },
        {
            "msg": "Branch is required",
            "param": "branch",
            "location": "body"
        },
        {
            "msg": "Year is required",
            "param": "year",
            "location": "body"
        },
        {
            "msg": "Phone number is required",
            "param": "phone",
            "location": "body"
        }
    ]
}
```

**HTTP Status:** 400 Bad Request  
**Error Type:** Validation Error  
**Test Status:** ✅ PASSED

### 3.2 Missing Required Fields - Student Creation (Admin)

**Test Case:** `POST /api/admin/students` - Empty Request Body

**Headers:**

```
Authorization: Bearer faculty_admin_jwt_token
```

**Input:**

```json
{}
```

**Expected Response:**

```json
{
    "errors": [
        {
            "msg": "Student ID is required",
            "param": "studentId",
            "location": "body"
        },
        {
            "msg": "Name is required",
            "param": "name",
            "location": "body"
        },
        {
            "msg": "Email is required",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Password is required",
            "param": "password",
            "location": "body"
        },
        {
            "msg": "Department is required",
            "param": "department",
            "location": "body"
        },
        {
            "msg": "Branch is required",
            "param": "branch",
            "location": "body"
        },
        {
            "msg": "Year is required",
            "param": "year",
            "location": "body"
        },
        {
            "msg": "Phone number is required",
            "param": "phone",
            "location": "body"
        }
    ]
}
```

**HTTP Status:** 400 Bad Request  
**Error Type:** Validation Error  
**Test Status:** ✅ PASSED

---

## Error Handling Architecture

### Error Response Format Standards

All error responses follow consistent formatting:

#### Authentication/Authorization Errors

```json
{
    "message": "Error description string"
}
```

#### Validation Errors

```json
{
    "errors": [
        {
            "msg": "Error message",
            "param": "field_name",
            "location": "body|query|params"
        }
    ]
}
```

### HTTP Status Code Usage

| Status Code | Usage                 | Examples                          |
| ----------- | --------------------- | --------------------------------- |
| 400         | Bad Request           | Validation errors, malformed data |
| 401         | Unauthorized          | Missing/invalid authentication    |
| 403         | Forbidden             | Insufficient permissions          |
| 500         | Internal Server Error | Server-side errors                |

### Error Categories Summary

| Error Category | Count | Status Codes | Test Coverage |
| -------------- | ----- | ------------ | ------------- |
| Authentication | 4     | 400, 401     | ✅ Complete   |
| Authorization  | 2     | 401, 403     | ✅ Complete   |
| Validation     | 2     | 400          | ✅ Complete   |
| **Total**      | **8** | **3 codes**  | **✅ 100%**   |

---

## Test Execution Results

**Error Test Cases Executed:** 8/8 ✅  
**All Error Scenarios:** PASSED ✅  
**Error Response Validation:** 100% ✅  
**HTTP Status Code Accuracy:** 100% ✅

---

_Generated on: 19 October 2025_  
_Error Testing Framework: Jest with Supertest_  
_Error Coverage: 100% of identified error scenarios_

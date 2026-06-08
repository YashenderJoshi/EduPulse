# 🎓 EduPulse - College Management System

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)]()
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)]()

EduPulse is a full-stack college management system built to streamline student operations such as attendance, fees, timetable, transport, and notifications.

---

## 🌟 Features

### 👨‍🎓 Student Portal

* 📊 Dashboard with attendance, fees & notifications
* 📅 Attendance tracking
* 💰 Fee status & payment history
* 📝 Leave application system
* 🕐 Timetable access
* 🔔 Notifications

### 👨‍💼 Admin Portal

* 📈 Dashboard with system insights
* 👥 Student management
* 📊 Attendance monitoring
* 💰 Fee management system
* 🕐 Timetable management
* 🚌 Transport management
* 📢 Notification system

---

## 🏗️ System Architecture

```
┌──────────────────────┐    ┌──────────────────────────┐    ┌──────────────────────┐
│      React SPA       │    │     FastAPI Backend      │    │       MongoDB        │
│     (Frontend)       │◄──►│       (REST APIs)        │◄──►│      (Database)      │
│                      │    │                          │    │                      │
│ • Components         │    │ • API Endpoints          │    │ • Collections        │
│ • Pages              │    │ • JWT Authentication     │    │ • Indexing           │
│ • State Management   │    │ • Business Logic         │    │ • Aggregation        │
│ • Routing            │    │ • Validation             │    │ • Data Storage       │
└──────────────────────┘    └──────────────────────────┘    └──────────────────────┘
           │                          │                          │
           └──────────────────────────┼──────────────────────────┘
                                      │
                          ┌──────────────────────────┐
                          │    External Services     │
                          │                          │
                          │ • Email Notifications    │
                          │ • File Upload (Future)   │
                          │ • Payment Gateway (Future)│
                          │ • SMS Alerts (Future)    │
                          └──────────────────────────┘
```

---

## 🛠️ Tech Stack

### 🎨 Frontend

* React + TypeScript
* Tailwind CSS
* Vite
* Framer Motion
* React Router

### ⚙️ Backend

* FastAPI (Python)
* JWT Authentication
* Pydantic Validation

### 🗄️ Database

* MongoDB

---

## 📁 Project Structure

```
Project_DRDO/
│
├── Edu_Pulse/
│   ├── src/                # Frontend
│   ├── fastapi_backend/    # Backend
│   ├── package.json
│   ├── requirements.txt
│   └── README.md
```

---

## 🚀 Installation & Setup

### 🔧 Backend Setup

```
cd E:\Project_DRDO\Project_DRDO\Edu_Pulse\fastapi_backend

python -m venv venv
venv\Scripts\activate

pip install -r ../requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 🎨 Frontend Setup

```
cd E:\Project_DRDO\Project_DRDO\Edu_Pulse> 

npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔐 Login Credentials

### 👨‍💼 Admin

* Email: [example@gmail.com](mailto:example@gmail.com)
* Password: Admin1234

### 👨‍🎓 Student

* Email: [example@gmail.com](mailto:example@gmail.com)
* Password: example1234

---

## 📡 API Example

### Login API

```
POST /api/auth/login
```

Request:

```
{
  "email": "student@gmail.com",
  "password": "123456"
}
```

Response:

```
{
  "access_token": "JWT_TOKEN",
  "user": {
    "name": "Student",
    "role": "student"
  }
}
```

---

## ⚠️ Important Notes

* MongoDB must be running locally
* Start backend before frontend
* API Base URL:

```
http://127.0.0.1:8000/api
```

---

## 🎯 Project Highlights

* Full-stack architecture (Frontend + Backend + DB)
* Role-based authentication system
* Real-world admin & student workflows
* Modular and scalable design

---

## 🙌 Author

**Yashender Joshi**

---

## 🚀 Future Improvements

* Deployment (Vercel + Render)
* Real-time notifications
* Analytics dashboard
* AI-based insights

---

**EduPulse — Turning college systems into smart digital platforms 🚀**

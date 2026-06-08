import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./hooks/useAuth";
import { ThemeProvider } from "./hooks/useTheme";

/* PUBLIC PAGES */

import { Homepage } from "./pages/Homepage";
import { AdminLogin } from "./pages/auth/AdminLogin";
import { StudentLogin } from "./pages/auth/StudentLogin";
import { StudentRegister } from "./pages/auth/StudentRegister";

/* STUDENT PAGES */

import AttendancePage from "./pages/student/AttendancePage";
import FacultyContact from "./pages/student/FacultyContact";
import FeeManagement from "./pages/student/FeeManagement";
import LeaveApplication from "./pages/student/LeaveApplication";
import NotificationCenter from "./pages/student/NotificationCenter";
import StudentDashboard from "./pages/student/StudentDashboard";
import TimetablePage from "./pages/student/TimetablePage";

/* ADMIN PAGES */

import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminFeeManagement } from "./pages/admin/AdminFeeManagement";
import { AdminRoleSelection } from "./pages/admin/AdminRoleSelection";
import AttendanceMonitoring from "./pages/admin/AttendanceMonitoring";
import { FacultyAdminDashboard } from "./pages/admin/FacultyAdminDashboard";
import { FacultyDirectory } from "./pages/admin/FacultyDirectory";
import { FinanceAdminDashboard } from "./pages/admin/FinanceAdminDashboard";
import { LeaveRequests } from "./pages/admin/LeaveRequests";
import { NotificationManagement } from "./pages/admin/NotificationManagement";
import { StudentManagement } from "./pages/admin/StudentManagement";
import { TimetableManagement } from "./pages/admin/TimetableManagement";
import { TransportAdminDashboard } from "./pages/admin/TransportAdminDashboard";
import { TransportManagement } from "./pages/admin/TransportManagement";

/* PROTECTED ROUTE */

function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: "student" | "admin";
}) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/student/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

/* ROUTES */

function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}

      <Route path="/" element={<Homepage />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/register" element={<StudentRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* STUDENT */}

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/attendance"
        element={
          <ProtectedRoute requiredRole="student">
            <AttendancePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/fees"
        element={
          <ProtectedRoute requiredRole="student">
            <FeeManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/leave"
        element={
          <ProtectedRoute requiredRole="student">
            <LeaveApplication />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/notifications"
        element={
          <ProtectedRoute requiredRole="student">
            <NotificationCenter />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/timetable"
        element={
          <ProtectedRoute requiredRole="student">
            <TimetablePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/faculty"
        element={
          <ProtectedRoute requiredRole="student">
            <FacultyContact />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/role-selection"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminRoleSelection />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/faculty-dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <FacultyAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/finance-dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <FinanceAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/transport-dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <TransportAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/students"
        element={
          <ProtectedRoute requiredRole="admin">
            <StudentManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/attendance"
        element={
          <ProtectedRoute requiredRole="admin">
            <AttendanceMonitoring />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/fees"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminFeeManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/leave"
        element={
          <ProtectedRoute requiredRole="admin">
            <LeaveRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/notifications"
        element={
          <ProtectedRoute requiredRole="admin">
            <NotificationManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/timetable"
        element={
          <ProtectedRoute requiredRole="admin">
            <TimetableManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/faculty"
        element={
          <ProtectedRoute requiredRole="admin">
            <FacultyDirectory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/transport"
        element={
          <ProtectedRoute requiredRole="admin">
            <TransportManagement />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/* MAIN APP */

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
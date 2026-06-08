import { motion } from "framer-motion";
import {
  DollarSign,
  Eye,
  EyeOff,
  GraduationCap,
  Shield,
  Truck,
} from "lucide-react";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Input } from "../../components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const adminRoles = [
  {
    id: "super-admin",
    title: "Super Admin",
    description: "Full system access",
    icon: Shield,
    dashboardPath: "/admin/dashboard",
  },
  {
    id: "faculty-admin",
    title: "Faculty Admin",
    description: "Manage academics",
    icon: GraduationCap,
    dashboardPath: "/admin/dashboard",
  },
  {
    id: "finance-admin",
    title: "Finance Admin",
    description: "Handle fee management",
    icon: DollarSign,
    dashboardPath: "/admin/dashboard",
  },
  {
    id: "transport-admin",
    title: "Transport Admin",
    description: "Manage transport",
    icon: Truck,
    dashboardPath: "/admin/dashboard",
  },
];

export function AdminLogin() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    adminRole: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.username) newErrors.username = "Email required";
    if (!formData.password) newErrors.password = "Password required";
    if (!formData.adminRole) newErrors.adminRole = "Select admin role";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {

      const res = await api.post("/auth/login", {
        email: formData.username,
        password: formData.password,
      });

      localStorage.setItem("access_token", res.data.access_token);

      login({
        ...res.data.user,
        role: "admin",
        adminRole: formData.adminRole,
      });

      navigate("/admin/dashboard");

    } catch {

      alert("Invalid admin credentials");

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >

        {/* Header */}

        <div className="text-center mb-8">

          <Link to="/" className="inline-flex items-center gap-2 mb-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
              <Shield className="h-6 w-6 text-white" />
            </div>

            <span className="text-2xl font-bold">
              EduPulse
            </span>

          </Link>

          <h1 className="text-2xl font-bold mb-1">
            Admin Portal
          </h1>

          <p className="text-gray-500">
            Secure administrator access
          </p>

        </div>

        {/* Login Card */}

        <Card className="shadow-xl border-0">

          <CardHeader>

            <CardTitle>
              Administrator Login
            </CardTitle>

            <CardDescription>
              Enter credentials and select your role
            </CardDescription>

          </CardHeader>

          <CardContent>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}

              <div>

                <Input
                  placeholder="Admin Email"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      username: e.target.value,
                    })
                  }
                  className={errors.username ? "border-red-500" : ""}
                />

                {errors.username && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.username}
                  </p>
                )}

              </div>

              {/* Password */}

              <div className="relative">

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >

                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </Button>

              </div>

              {/* Role Selection */}

              <Select
                value={formData.adminRole}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    adminRole: value,
                  })
                }
              >

                <SelectTrigger className={errors.adminRole ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select admin role" />
                </SelectTrigger>

                <SelectContent>

                  {adminRoles.map((role) => {

                    const Icon = role.icon;

                    return (

                      <SelectItem key={role.id} value={role.id}>

                        <div className="flex items-center gap-3">

                          <Icon size={16} />

                          <div>

                            <div className="font-medium">
                              {role.title}
                            </div>

                            <div className="text-xs text-gray-500">
                              {role.description}
                            </div>

                          </div>

                        </div>

                      </SelectItem>

                    );

                  })}

                </SelectContent>

              </Select>

              {errors.adminRole && (
                <p className="text-red-600 text-sm">
                  {errors.adminRole}
                </p>
              )}

              {/* Login Button */}

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >

                Login to Dashboard

              </Button>

            </form>

            <div className="mt-6 text-center text-sm">

              <p className="text-gray-500">

                Need student access?{" "}

                <Link
                  to="/student/login"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >

                  Student Login

                </Link>

              </p>

            </div>

          </CardContent>

        </Card>

      </motion.div>

    </div>

  );

}
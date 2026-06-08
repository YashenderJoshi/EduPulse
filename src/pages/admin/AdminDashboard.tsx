import { motion } from 'framer-motion';
import {
    AlertTriangle,
    BarChart3,
    Bell,
    Calendar,
    DollarSign,
    FileText,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Layout } from '../../components/common/Layout';
import { Button } from '../../components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import { useAuth } from '../../hooks/useAuth';

// ✅ Charts
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export function AdminDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        students: 0,
        attendance_present: 0,
        attendance_absent: 0,
        attendance_percentage: 0,
        fees_pending: 0,
        fees_paid: 0,
        leaves: 0,
        notifications: 0,
        low_attendance_students: [] as any[],
    });

    useEffect(() => {
        if (user && user.role === 'admin' && !user.adminRole) {
            navigate('/admin/role-selection', { replace: true });
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get("/admin/dashboard");
                 console.log("🔥 API DATA:", res.data); 
                setStats(res.data);
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            }
        };
        fetchDashboard();
    }, []);

    const dashboardCards = [
        { title: 'Total Students', value: stats.students, icon: Users },
        { title: 'Attendance', value: stats.attendance_present, icon: AlertTriangle },
        { title: 'Pending Fees', value: stats.fees_pending, icon: DollarSign },
        { title: 'Leave Requests', value: stats.leaves, icon: FileText },
        { title: 'Notifications', value: stats.notifications, icon: Bell },
    ];

    const quickActions = [
        { label: 'Add New Student', href: '/admin/students', icon: Users },
        { label: 'Create Notification', href: '/admin/notifications', icon: Bell },
        { label: 'View Reports', href: '/admin/reports', icon: BarChart3 },
        { label: 'Manage Schedule', href: '/admin/timetable', icon: Calendar },
    ];

    // ✅ Real Chart Data
    const attendanceData = [
        { name: "Present", value: stats.attendance_present },
        { name: "Absent", value: stats.attendance_absent },
    ];

    const feeData = [
        { name: "Pending", value: stats.fees_pending },
        { name: "Paid", value: stats.fees_paid },
    ];

    // temporary weekly (we'll upgrade later)
    const weeklyData = [
        { day: "Mon", classes: 40 },
        { day: "Tue", classes: 55 },
        { day: "Wed", classes: 60 },
        { day: "Thu", classes: 45 },
        { day: "Fri", classes: 70 },
    ];

    const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b"];

    return (
        <Layout title="Admin Dashboard">
            <div className="space-y-8">

                {/* Welcome */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
                        <h1 className="text-3xl font-bold">
                            Welcome back, {user?.name}! 👋
                        </h1>
                        <p className="text-indigo-100">
                            Edu Pulse Management System
                        </p>
                    </div>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {dashboardCards.map((card, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <CardTitle>{card.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {card.value}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            {quickActions.map((action, i) => {
                                const Icon = action.icon;
                                return (
                                    <Button
                                        key={i}
                                        onClick={() => navigate(action.href)}
                                        className="flex items-center gap-2"
                                    >
                                        <Icon size={16} />
                                        {action.label}
                                    </Button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* 📊 Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Attendance */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Attendance Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={attendanceData} dataKey="value">
                                        {attendanceData.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Fees */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Fee Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={feeData} dataKey="value">
                                        {feeData.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i + 2]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Weekly */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={weeklyData}>
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="classes" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                </div>

                {/* 🔥 Smart Insights */}
                <Card>
                    <CardHeader>
                        <CardTitle>Smart Insights</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <p>
                            🎯 Attendance Rate: {Number(stats.attendance_percentage).toFixed(1)}%
                        </p>

                        {stats.attendance_percentage < 75 && (
                            <p className="text-red-500">
                                ⚠️ Attendance is critically low
                            </p>
                        )}

                        {stats.fees_pending > 20 && (
                            <p className="text-yellow-500">
                                💰 High pending fees detected
                            </p>
                        )}

                        <div className="mt-4">
                            <p className="font-semibold">Low Attendance Students:</p>

                            {stats.low_attendance_students?.slice(0, 3).map((s, i) => (
                                <p key={i} className="text-sm text-gray-500">
                                    {s.name} ({s.attendance}%)
                                </p>
                            ))}
                        </div>

                    </CardContent>
                </Card>

            </div>
        </Layout>
    );
}
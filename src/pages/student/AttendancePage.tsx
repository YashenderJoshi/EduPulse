import { motion } from 'framer-motion';
import { AlertTriangle, Calendar } from 'lucide-react';
import {
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { Layout } from '../../components/common/Layout';
import { Badge } from '../../components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';

import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AttendancePage() {

    const [records, setRecords] = useState<any[]>([]);
    const [analytics, setAnalytics] = useState<any>(null);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {

            const [attendanceRes, analyticsRes] = await Promise.all([
                api.get("/students/attendance"),
                api.get("/students/attendance-analytics")
            ]);

            setRecords(attendanceRes.data ?? []);
            setAnalytics(analyticsRes.data ?? {});

        } catch (err) {

            console.error("Attendance fetch failed:", err);

            // NEVER allow UI to crash
            setRecords([]);
            setAnalytics({
                percentage: 0,
                present: 0,
                absent: 0,
                monthly: []
            });
        }
    };

    // ⭐ graceful loading
    if (!analytics) {
        return (
            <Layout title="Attendance">
                <div className="p-10 text-center text-gray-500">
                    Loading attendance...
                </div>
            </Layout>
        );
    }

    const currentAttendance = analytics.percentage ?? 0;

    const monthlyData = (analytics.monthly ?? []).map((m: any) => ({
        month: m.month?.slice(5) || "",
        percentage: m.percentage ?? 0,
    }));

    const pieData = [
        { name: 'Present', value: analytics.present ?? 0, fill: '#10B981' },
        { name: 'Absent', value: analytics.absent ?? 0, fill: '#EF4444' },
    ];

    // ⭐ SUBJECT-WISE
    const subjectMap: any = {};

    (records ?? []).forEach((r) => {
        if (!subjectMap[r.subject]) {
            subjectMap[r.subject] = { present: 0, total: 0 };
        }

        subjectMap[r.subject].total++;

        if (r.status === "Present") {
            subjectMap[r.subject].present++;
        }
    });

    const subjectWiseData = Object.keys(subjectMap).map((subject) => {
        const data = subjectMap[subject];
        const pct = Math.round((data.present / data.total) * 100);

        return {
            subject,
            attendance: pct,
            color: pct >= 75 ? '#10B981' : '#EF4444',
        };
    });

    const totalClasses = (analytics.present ?? 0) + (analytics.absent ?? 0);

    return (
        <Layout title="Attendance">
            <div className="space-y-8">

                {/* ALERT */}
                {currentAttendance < 75 && (
                    <Card className="border-red-200 bg-red-50">
                        <CardContent className="p-6 flex gap-3">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                            <div>
                                <h3 className="font-semibold text-red-800">
                                    Low Attendance Warning
                                </h3>
                                <p>Your attendance is {currentAttendance}%.</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* ⭐ OVERVIEW CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">
                                Overall Attendance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {currentAttendance}%
                            </div>

                            <Badge
                                variant={
                                    currentAttendance >= 75
                                        ? 'success'
                                        : 'destructive'
                                }
                            >
                                {currentAttendance >= 75 ? 'Good' : 'Low'}
                            </Badge>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">
                                Total Classes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {totalClasses}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">
                                Required Attendance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                75%
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Attendance Trend</CardTitle>
                            <CardDescription>Real analytics</CardDescription>
                        </CardHeader>

                        <CardContent className="h-80">
                            <ResponsiveContainer>
                                <LineChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="percentage"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Attendance Distribution</CardTitle>
                        </CardHeader>

                        <CardContent className="h-80">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value">
                                        {pieData.map((entry, i) => (
                                            <Cell key={i} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                </div>

                {/* SUBJECT WISE */}
                <Card>
                    <CardHeader>
                        <CardTitle>Subject-wise Attendance</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {subjectWiseData.map((subject, i) => (
                            <div key={i}>
                                <div className="flex justify-between">
                                    <span>{subject.subject}</span>
                                    <Badge
                                        variant={
                                            subject.attendance >= 75
                                                ? 'success'
                                                : 'destructive'
                                        }
                                    >
                                        {subject.attendance}%
                                    </Badge>
                                </div>

                                <div className="w-full bg-gray-200 h-2 rounded">
                                    <div
                                        className="h-2 rounded"
                                        style={{
                                            width: `${subject.attendance}%`,
                                            backgroundColor: subject.color,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* TABLE */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex gap-2">
                            <Calendar className="h-5 w-5" />
                            Recent Attendance Records
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left pb-3">Date</th>
                                        <th className="text-left pb-3">Subject</th>
                                        <th className="text-left pb-3">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {(records ?? []).slice().reverse().map((r, i) => (
                                        <tr key={i} className="border-b">
                                            <td className="py-3">{r.date}</td>
                                            <td>{r.subject}</td>
                                            <td>
                                                <Badge
                                                    variant={
                                                        r.status === "Present"
                                                            ? 'success'
                                                            : 'destructive'
                                                    }
                                                >
                                                    {r.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </Layout>
    );
}

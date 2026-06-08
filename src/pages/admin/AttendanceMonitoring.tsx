import React, { useEffect, useState } from "react";
import { Layout } from "../../components/common/Layout";
import api from "../../api/axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function AttendanceMonitoring() {

  const [loading, setLoading] = useState(true);
  const [sendingNotice, setSendingNotice] = useState<string | null>(null);

  const [data, setData] = useState({
    total_classes: 0,
    present: 0,
    absent: 0,
    low_attendance_students: [] as any[]
  });

  const fetchAttendance = async () => {

    try {

      setLoading(true);

      const res = await api.get("/admin/attendance-monitor");

      setData({
        total_classes: res.data.total_classes || 0,
        present: res.data.present || 0,
        absent: res.data.absent || 0,
        low_attendance_students: res.data.low_attendance_students || []
      });

    } catch (error) {

      console.error("Attendance monitor failed:", error);

    } finally {

      setLoading(false);

    }

  };

  const sendNotice = async (studentId: string) => {

    try {

      setSendingNotice(studentId);

      await api.post(`/admin/send-attendance-notice/${studentId}`);

      alert("Notice sent to student successfully");

    } catch (error) {

      console.error("Notice failed:", error);
      alert("Failed to send notice");

    } finally {

      setSendingNotice(null);

    }

  };

  useEffect(() => {

    fetchAttendance();

  }, []);

  if (loading) {

    return (
      <Layout title="Attendance Monitoring">
        <div className="text-center mt-10">Loading attendance data...</div>
      </Layout>
    );

  }

  const attendancePercent =
    data.total_classes === 0
      ? 0
      : Math.round((data.present / data.total_classes) * 100);

  return (

    <Layout title="Attendance Monitoring">

      <div className="space-y-8">

        {/* HEADER */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-2xl font-bold mb-1">
              Attendance Monitoring
            </h1>

            <p className="text-gray-500">
              Monitor attendance across the system
            </p>

          </div>

          <Button onClick={fetchAttendance}>
            <RefreshCw size={16} className="mr-2"/>
            Refresh
          </Button>

        </div>

        {/* ALERT */}

        {data.low_attendance_students.length > 0 && (

          <Card className="border-red-200 bg-red-50">

            <CardContent className="p-4 flex items-center gap-3">

              <AlertTriangle className="text-red-600" />

              <div>

                <p className="font-semibold text-red-700">
                  Attendance Alert
                </p>

                <p className="text-sm text-red-600">
                  {data.low_attendance_students.length} students below 75%
                </p>

              </div>

            </CardContent>

          </Card>

        )}

        {/* SUMMARY */}

        <div className="grid grid-cols-3 gap-6">

          <Card>

            <CardHeader>
              <CardTitle>Total Classes</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">{data.total_classes}</p>
            </CardContent>

          </Card>

          <Card>

            <CardHeader>
              <CardTitle>Present</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {data.present}
              </p>
            </CardContent>

          </Card>

          <Card>

            <CardHeader>
              <CardTitle>Absent</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold text-red-600">
                {data.absent}
              </p>
            </CardContent>

          </Card>

        </div>

        {/* OVERALL */}

        <Card>

          <CardHeader>
            <CardTitle>Overall Attendance</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold text-blue-600">
              {attendancePercent}%
            </p>
          </CardContent>

        </Card>

        {/* LOW ATTENDANCE STUDENTS */}

        <Card>

          <CardHeader>
            <CardTitle>Students Requiring Attention</CardTitle>
          </CardHeader>

          <CardContent>

            {data.low_attendance_students.length === 0 ? (

              <p className="text-gray-500">
                No students with low attendance
              </p>

            ) : (

              <table className="w-full">

                <thead>

                  <tr className="border-b text-left">

                    <th className="py-2">Name</th>
                    <th>ID</th>
                    <th>Attendance</th>
                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {data.low_attendance_students.map((student: any) => (

                    <tr key={student.studentId} className="border-b">

                      <td className="py-2">{student.name}</td>

                      <td>{student.studentId}</td>

                      <td>

                        <Badge variant="destructive">
                          {student.attendance}%
                        </Badge>

                      </td>

                      <td>

                        <Button
                          size="sm"
                          disabled={sendingNotice === student.studentId}
                          onClick={() => sendNotice(student.studentId)}
                        >

                          {sendingNotice === student.studentId
                            ? "Sending..."
                            : "Send Notice"}

                        </Button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </CardContent>

        </Card>

      </div>

    </Layout>

  );

}
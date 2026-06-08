import { motion } from 'framer-motion';
import { Bell, Calendar, Clock, MapPin, User } from 'lucide-react';
import { Layout } from '../../components/common/Layout';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../../components/ui/tabs';

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';
import jsPDF from "jspdf";

type Period = {
    time: string;
    subject: string;
    faculty: string;
    room: string;
};

type DaySchedule = {
    day: string;
    periods: Period[];
};

const getCurrentDay = () => {
    const days = [
        'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',
    ];
    return days[new Date().getDay()];
};

const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2,'0')}:${now
        .getMinutes()
        .toString()
        .padStart(2,'0')}`;
};

export default function TimetablePage() {

    const currentDay = getCurrentDay();
    const navigate = useNavigate();

    const [theory, setTheory] = useState<DaySchedule[]>([]);
    const [labs, setLabs] = useState<DaySchedule[]>([]);

    useEffect(() => {
        fetchTimetable();
    }, []);

    const fetchTimetable = async () => {
        try {
            const res = await api.get("/students/timetable");
            setTheory(res.data?.theory ?? []);
            setLabs(res.data?.labs ?? []);
        } catch (err) {
            console.error("Timetable fetch failed:", err);
            setTheory([]);
            setLabs([]);
        }
    };

    // 🔥 DOWNLOAD PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        let y = 15;

        doc.setFontSize(18);
        doc.text("Student Timetable", 10, y);
        y += 10;

        [...theory, ...labs].forEach((day) => {
            doc.setFontSize(14);
            doc.text(day.day, 10, y);
            y += 8;

            day.periods.forEach((p) => {
                doc.setFontSize(12);
                doc.text(
                    `${p.time} | ${p.subject} | ${p.faculty} | ${p.room}`,
                    10,
                    y
                );
                y += 6;
            });

            y += 5;
        });

        doc.save("timetable.pdf");
    };

    // 🔔 REAL REMINDERS
    const setReminders = async () => {

        if (!("Notification" in window)) {
            alert("Browser does not support notifications");
            return;
        }

        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
            alert("Notification permission denied");
            return;
        }

        const todaySchedule =
            [...theory, ...labs].find(day => day.day === currentDay);

        if (!todaySchedule || todaySchedule.periods.length === 0) {
            alert("No classes scheduled for today.");
            return;
        }

        todaySchedule.periods.forEach(period => {

            const [start] = period.time.split("-");
            const [hour, minute] = start.split(":");

            const classTime = new Date();
            classTime.setHours(parseInt(hour));
            classTime.setMinutes(parseInt(minute));
            classTime.setSeconds(0);

            const now = new Date();
            const diff = classTime.getTime() - now.getTime() - 60000; // 1 min before

            if (diff > 0) {
                setTimeout(() => {
                    new Notification("Upcoming Class", {
                        body: `${period.subject} at ${period.time} in ${period.room}`,
                    });
                }, diff);
            }
        });

        alert("Reminders scheduled for today’s classes.");
    };

    return (
        <Layout title="Timetable">
            <div className="space-y-8">

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">
                                Class Timetable
                            </h1>
                            <p className="text-gray-500">
                                Your weekly class schedule
                            </p>
                        </div>

                        <Badge variant="outline" className="flex gap-2">
                            <Calendar className="h-4 w-4" />
                            Today: {currentDay}
                        </Badge>
                    </div>
                </motion.div>

                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Schedule</CardTitle>
                        <CardDescription>
                            Theory & Lab sessions
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Tabs defaultValue="theory">

                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="theory">
                                    Theory Classes
                                </TabsTrigger>
                                <TabsTrigger value="labs">
                                    Lab Sessions
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="theory" className="mt-6">
                                {theory.length === 0 && (
                                    <div className="text-center text-gray-500 py-10">
                                        No theory timetable found.
                                    </div>
                                )}

                                {theory.map((day) => (
                                    <div key={day.day} className="mb-6">
                                        <h3 className="font-semibold text-lg mb-3">
                                            {day.day}
                                        </h3>

                                        {day.periods.map((period, i) => (
                                            <div key={i} className="p-4 border rounded-lg mb-3">
                                                <h4 className="font-semibold mb-1">
                                                    {period.subject}
                                                </h4>

                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                    <div>{period.time}</div>
                                                    <div>{period.faculty}</div>
                                                    <div>{period.room}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="labs" className="mt-6">
                                {labs.length === 0 && (
                                    <div className="text-center text-gray-500 py-10">
                                        No lab schedule found.
                                    </div>
                                )}

                                {labs.map((day) => (
                                    <div key={day.day} className="mb-6">
                                        <h3 className="font-semibold text-lg mb-3">
                                            {day.day}
                                        </h3>

                                        {day.periods.map((period, i) => (
                                            <div key={i} className="p-4 border rounded-lg mb-3 bg-purple-50">
                                                <h4 className="font-semibold mb-1">
                                                    {period.subject}
                                                </h4>

                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                    <div>{period.time}</div>
                                                    <div>{period.faculty}</div>
                                                    <div>{period.room}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </TabsContent>

                        </Tabs>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>

                    <CardContent className="flex gap-3 flex-wrap">
                        <Button variant="outline" onClick={downloadPDF}>
                            <Calendar className="h-4 w-4 mr-2"/>
                            Download PDF
                        </Button>

                        <Button variant="outline" onClick={setReminders}>
                            <Bell className="h-4 w-4 mr-2"/>
                            Set Reminders
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => navigate("/student/faculty")}
                        >
                            <User className="h-4 w-4 mr-2"/>
                            Contact Faculty
                        </Button>
                    </CardContent>
                </Card>

            </div>
        </Layout>
    );
}
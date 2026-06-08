import { motion } from 'framer-motion';
import { AlertCircle, Bell, CheckCircle, Info, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../api/axios';

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
import { Input } from '../../components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';

type Notification = {
    _id?: string;
    title: string;
    content: string;
    type?: string;
    priority?: string;
    date?: string;
};

export default function NotificationCenter() {

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');

    const filters = ['All', 'Academic', 'Exam', 'Admin', 'Urgent'];

    // ✅ LOAD FROM BACKEND
    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {

            // ⭐ DO NOT ADD /api
            const res = await api.get("/students/notifications");

            if (Array.isArray(res.data)) {
                setNotifications(res.data);
            } else {
                setNotifications([]);
            }

        } catch (err) {

            console.error("Notifications fetch failed:", err);

            // never crash UI
            setNotifications([]);
        }
    };

    // ✅ FILTERING
    const filteredNotifications = notifications.filter((notification) => {

        const matchesSearch =
            notification.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.content?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            selectedFilter === 'All' ||
            notification.type === selectedFilter ||
            (selectedFilter === 'Urgent' &&
                notification.priority === 'High');

        return matchesSearch && matchesFilter;
    });

    // ✅ LIVE STATS
    const urgent = notifications.filter(n => n.priority === "High").length;
    const academic = notifications.filter(n => n.type === "Academic").length;

    const getNotificationIcon = (type?: string, priority?: string) => {
        if (priority === 'High')
            return <AlertCircle className="h-5 w-5 text-red-500" />;
        if (type === 'Academic')
            return <CheckCircle className="h-5 w-5 text-blue-500" />;
        return <Info className="h-5 w-5 text-gray-500" />;
    };

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case 'High':
                return 'destructive';
            case 'Medium':
                return 'warning';
            default:
                return 'secondary';
        }
    };

    return (
        <Layout title="Notifications">
            <div className="space-y-8">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <div>
                        <h1 className="text-2xl font-bold mb-2">
                            Notification Center
                        </h1>
                        <p className="text-gray-500">
                            Stay updated with important announcements
                        </p>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search notifications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-64"
                        />
                    </div>
                </motion.div>

                {/* STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-blue-600">
                                {notifications.length}
                            </div>
                            <p className="text-sm text-gray-600">Total</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-red-600">
                                {urgent}
                            </div>
                            <p className="text-sm text-gray-600">Urgent</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-green-600">
                                {notifications.length}
                            </div>
                            <p className="text-sm text-gray-600">Unread</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-yellow-600">
                                {academic}
                            </div>
                            <p className="text-sm text-gray-600">
                                Academic
                            </p>
                        </CardContent>
                    </Card>

                </div>

                {/* LIST */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            All Notifications
                        </CardTitle>

                        <CardDescription>
                            Latest updates from your college
                        </CardDescription>

                        <Tabs
                            value={selectedFilter}
                            onValueChange={setSelectedFilter}
                        >
                            <TabsList>
                                {filters.map((filter) => (
                                    <TabsTrigger key={filter} value={filter}>
                                        {filter}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        {filteredNotifications.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                No notifications found.
                            </div>
                        )}

                        {filteredNotifications.map((notification, index) => (

                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`p-4 border rounded-lg hover:shadow-md ${
                                    notification.priority === 'High'
                                        ? 'border-red-200 bg-red-50'
                                        : ''
                                }`}
                            >
                                <div className="flex items-start gap-3">

                                    {getNotificationIcon(
                                        notification.type,
                                        notification.priority
                                    )}

                                    <div className="flex-1">

                                        <div className="flex justify-between mb-2">

                                            <h3 className="font-semibold">
                                                {notification.title}
                                            </h3>

                                            <div className="flex gap-2">
                                                <Badge variant={getPriorityColor(notification.priority)}>
                                                    {notification.priority || "Low"}
                                                </Badge>

                                                {notification.type && (
                                                    <Badge variant="outline">
                                                        {notification.type}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-2">
                                            {notification.content}
                                        </p>

                                        <span className="text-xs text-gray-400">
                                            {notification.date
                                                ? new Date(notification.date).toLocaleDateString()
                                                : ""}
                                        </span>

                                    </div>
                                </div>
                            </motion.div>

                        ))}

                    </CardContent>
                </Card>

            </div>
        </Layout>
    );
}

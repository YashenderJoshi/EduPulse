import { motion } from 'framer-motion';
import {
    Award,
    BookOpen,
    Calendar,
    Clock,
    GraduationCap,
    TrendingUp,
    UserCheck,
    Users,
} from 'lucide-react';
import { useState } from 'react';
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

const facultyStats = [
    {
        label: 'Total Faculty',
        value: 85,
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
    },
    {
        label: 'Active Classes',
        value: 124,
        icon: BookOpen,
        color: 'text-green-600',
        bg: 'bg-green-50',
    },
    {
        label: 'Departments',
        value: 8,
        icon: GraduationCap,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
    },
    {
        label: 'Avg Attendance',
        value: '87%',
        icon: UserCheck,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
    },
];

const recentActivities = [
    {
        action: 'New faculty member added',
        user: 'Dr. Sarah Johnson - Computer Science',
        time: '2 hours ago',
        type: 'add',
    },
    {
        action: 'Timetable updated',
        user: 'Electrical Engineering - Semester 3',
        time: '4 hours ago',
        type: 'update',
    },
    {
        action: 'Class rescheduled',
        user: 'Data Structures - CS301',
        time: '6 hours ago',
        type: 'reschedule',
    },
    {
        action: 'Faculty leave approved',
        user: 'Prof. Michael Brown - 3 days',
        time: '1 day ago',
        type: 'approve',
    },
];

const upcomingClasses = [
    {
        subject: 'Advanced Algorithms',
        faculty: 'Dr. Smith',
        time: '9:00 AM',
        room: 'CS-201',
        students: 45,
    },
    {
        subject: 'Digital Electronics',
        faculty: 'Prof. Wilson',
        time: '11:00 AM',
        room: 'EE-103',
        students: 38,
    },
    {
        subject: 'Thermodynamics',
        faculty: 'Dr. Taylor',
        time: '2:00 PM',
        room: 'ME-205',
        students: 42,
    },
    {
        subject: 'Structural Analysis',
        faculty: 'Prof. Davis',
        time: '3:30 PM',
        room: 'CE-102',
        students: 35,
    },
];

const facultyPerformance = [
    {
        name: 'Dr. Smith',
        department: 'Computer Science',
        classes: 18,
        attendance: 92,
        rating: 4.8,
    },
    {
        name: 'Prof. Wilson',
        department: 'Electrical Engineering',
        classes: 16,
        attendance: 89,
        rating: 4.6,
    },
    {
        name: 'Dr. Taylor',
        department: 'Mechanical Engineering',
        classes: 20,
        attendance: 95,
        rating: 4.9,
    },
    {
        name: 'Prof. Davis',
        department: 'Civil Engineering',
        classes: 14,
        attendance: 87,
        rating: 4.5,
    },
];

export function FacultyAdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <Layout title="Faculty Administration">
            <div className="space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                            <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Faculty Administration
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Manage faculty, academics, and educational
                                operations
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge
                            variant="outline"
                            className="px-4 py-2 text-sm font-medium"
                        >
                            Faculty Admin
                        </Badge>
                        <Button variant="outline" size="sm">
                            View All Faculty
                        </Button>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {facultyStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                        >
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                {stat.label}
                                            </p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {stat.value}
                                            </p>
                                        </div>
                                        <div
                                            className={`p-3 rounded-lg ${stat.bg}`}
                                        >
                                            <stat.icon
                                                className={`h-6 w-6 ${stat.color}`}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="faculty">Faculty</TabsTrigger>
                            <TabsTrigger value="classes">Classes</TabsTrigger>
                            <TabsTrigger value="performance">
                                Performance
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Activities */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Clock className="h-5 w-5" />
                                            Recent Activities
                                        </CardTitle>
                                        <CardDescription>
                                            Latest faculty and academic updates
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentActivities.map(
                                                (activity, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                                                    >
                                                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                                                            <TrendingUp className="h-4 w-4 text-blue-600" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {
                                                                    activity.action
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {activity.user}
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {activity.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Upcoming Classes */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            Upcoming Classes
                                        </CardTitle>
                                        <CardDescription>
                                            Today's scheduled classes
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {upcomingClasses.map(
                                                (classItem, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-3 rounded-lg border"
                                                    >
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {
                                                                    classItem.subject
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {
                                                                    classItem.faculty
                                                                }{' '}
                                                                •{' '}
                                                                {classItem.room}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium text-blue-600">
                                                                {classItem.time}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {
                                                                    classItem.students
                                                                }{' '}
                                                                students
                                                            </p>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="faculty" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Faculty Directory</CardTitle>
                                    <CardDescription>
                                        Manage faculty members and their
                                        information
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-semibold">
                                            All Faculty Members
                                        </h3>
                                        <Button>Add New Faculty</Button>
                                    </div>
                                    <div className="space-y-4">
                                        {facultyPerformance.map(
                                            (faculty, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-4 border rounded-lg"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                            <span className="font-semibold text-blue-600">
                                                                {faculty.name
                                                                    .split(' ')
                                                                    .map(
                                                                        (n) =>
                                                                            n[0],
                                                                    )
                                                                    .join('')}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {faculty.name}
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {
                                                                    faculty.department
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <Badge variant="outline">
                                                            {faculty.classes}{' '}
                                                            Classes
                                                        </Badge>
                                                        <Badge variant="secondary">
                                                            {faculty.attendance}
                                                            % Attendance
                                                        </Badge>
                                                        <div className="flex items-center gap-1">
                                                            <Award className="h-4 w-4 text-yellow-500" />
                                                            <span className="text-sm font-medium">
                                                                {faculty.rating}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="classes" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Class Management</CardTitle>
                                    <CardDescription>
                                        Manage class schedules and assignments
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-12">
                                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            Class Management
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            Comprehensive class scheduling and
                                            management tools
                                        </p>
                                        <Button>
                                            View Timetable Management
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="performance" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Faculty Performance</CardTitle>
                                    <CardDescription>
                                        Monitor and analyze faculty performance
                                        metrics
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {facultyPerformance.map(
                                            (faculty, index) => (
                                                <div
                                                    key={index}
                                                    className="p-4 border rounded-lg"
                                                >
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                                                {faculty.name}
                                                            </h4>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {
                                                                    faculty.department
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Award className="h-5 w-5 text-yellow-500" />
                                                            <span className="font-semibold text-lg">
                                                                {faculty.rating}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Classes Taught
                                                            </p>
                                                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                                {
                                                                    faculty.classes
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Class Attendance
                                                            </p>
                                                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                                {
                                                                    faculty.attendance
                                                                }
                                                                %
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </Layout>
    );
}

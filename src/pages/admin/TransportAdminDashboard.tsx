import { motion } from 'framer-motion';
import {
    AlertTriangle,
    CheckCircle,
    Clock,
    Fuel,
    MapPin,
    Route,
    Truck,
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

const transportStats = [
    {
        label: 'Active Buses',
        value: 24,
        icon: Truck,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        status: 'operational',
    },
    {
        label: 'Total Routes',
        value: 12,
        icon: Route,
        color: 'text-green-600',
        bg: 'bg-green-50',
        status: 'active',
    },
    {
        label: 'Students Using Transport',
        value: 1847,
        icon: Users,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        status: 'enrolled',
    },
    {
        label: 'Monthly Fuel Cost',
        value: '₹2.8L',
        icon: Fuel,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        status: 'expense',
    },
];

const busFleet = [
    {
        id: 'BUS001',
        route: 'Route A',
        driver: 'Rajesh Kumar',
        status: 'Active',
        students: 45,
        lastService: '2024-01-20',
    },
    {
        id: 'BUS002',
        route: 'Route B',
        driver: 'Suresh Patel',
        status: 'Active',
        students: 52,
        lastService: '2024-01-18',
    },
    {
        id: 'BUS003',
        route: 'Route C',
        driver: 'Mohan Singh',
        status: 'Maintenance',
        students: 0,
        lastService: '2024-01-15',
    },
    {
        id: 'BUS004',
        route: 'Route D',
        driver: 'Ramesh Sharma',
        status: 'Active',
        students: 38,
        lastService: '2024-01-22',
    },
];

const routes = [
    {
        id: 'A',
        name: 'Central - College',
        distance: '15 km',
        stops: 8,
        buses: 3,
        students: 145,
    },
    {
        id: 'B',
        name: 'North - College',
        distance: '12 km',
        stops: 6,
        buses: 2,
        students: 98,
    },
    {
        id: 'C',
        name: 'South - College',
        distance: '18 km',
        stops: 10,
        buses: 3,
        students: 156,
    },
    {
        id: 'D',
        name: 'East - College',
        distance: '10 km',
        stops: 5,
        buses: 2,
        students: 87,
    },
];

const recentAlerts = [
    {
        type: 'maintenance',
        message: 'Bus BUS003 scheduled for maintenance',
        time: '2 hours ago',
        priority: 'medium',
    },
    {
        type: 'delay',
        message: 'Route A experiencing 15-minute delay',
        time: '1 hour ago',
        priority: 'high',
    },
    {
        type: 'completed',
        message: 'Driver safety training completed',
        time: '3 hours ago',
        priority: 'low',
    },
    {
        type: 'fuel',
        message: 'Fuel refill completed for 5 buses',
        time: '4 hours ago',
        priority: 'low',
    },
];

const maintenanceSchedule = [
    {
        bus: 'BUS005',
        type: 'Regular Service',
        date: '2024-01-28',
        status: 'Scheduled',
    },
    {
        bus: 'BUS002',
        type: 'Tire Replacement',
        date: '2024-01-30',
        status: 'Scheduled',
    },
    {
        bus: 'BUS007',
        type: 'Engine Check',
        date: '2024-02-02',
        status: 'Pending',
    },
    {
        bus: 'BUS001',
        type: 'AC Repair',
        date: '2024-02-05',
        status: 'Scheduled',
    },
];

export function TransportAdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'success';
            case 'Maintenance':
                return 'warning';
            case 'Inactive':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    const getAlertIcon = (type: string) => {
        switch (type) {
            case 'maintenance':
                return AlertTriangle;
            case 'delay':
                return Clock;
            case 'completed':
                return CheckCircle;
            default:
                return AlertTriangle;
        }
    };

    return (
        <Layout title="Transport Administration">
            <div className="space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-orange-600 rounded-xl">
                            <Truck className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Transport Administration
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Manage buses, routes, and transportation
                                logistics
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="gap-2">
                            <MapPin className="h-4 w-4" />
                            Track Buses
                        </Button>
                        <Badge variant="outline" className="w-fit">
                            Transport Admin
                        </Badge>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {transportStats.map((stat, index) => (
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
                            <TabsTrigger value="fleet">Fleet</TabsTrigger>
                            <TabsTrigger value="routes">Routes</TabsTrigger>
                            <TabsTrigger value="maintenance">
                                Maintenance
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Alerts */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <AlertTriangle className="h-5 w-5" />
                                            Recent Alerts
                                        </CardTitle>
                                        <CardDescription>
                                            Latest transport updates and
                                            notifications
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentAlerts.map(
                                                (alert, index) => {
                                                    const AlertIcon =
                                                        getAlertIcon(
                                                            alert.type,
                                                        );
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                                                        >
                                                            <div
                                                                className={`p-2 rounded-full ${
                                                                    alert.priority ===
                                                                    'high'
                                                                        ? 'bg-red-100 dark:bg-red-900'
                                                                        : alert.priority ===
                                                                          'medium'
                                                                        ? 'bg-yellow-100 dark:bg-yellow-900'
                                                                        : 'bg-green-100 dark:bg-green-900'
                                                                }`}
                                                            >
                                                                <AlertIcon
                                                                    className={`h-4 w-4 ${
                                                                        alert.priority ===
                                                                        'high'
                                                                            ? 'text-red-600'
                                                                            : alert.priority ===
                                                                              'medium'
                                                                            ? 'text-yellow-600'
                                                                            : 'text-green-600'
                                                                    }`}
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-medium text-gray-900 dark:text-white">
                                                                    {
                                                                        alert.message
                                                                    }
                                                                </p>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {alert.time}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Active Routes */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Route className="h-5 w-5" />
                                            Active Routes
                                        </CardTitle>
                                        <CardDescription>
                                            Current operational routes
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {routes.map((route) => (
                                                <div
                                                    key={route.id}
                                                    className="flex items-center justify-between p-3 rounded-lg border"
                                                >
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            Route {route.id}:{' '}
                                                            {route.name}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {route.distance} •{' '}
                                                            {route.stops} stops
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium text-blue-600">
                                                            {route.buses} buses
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {route.students}{' '}
                                                            students
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="fleet" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Bus Fleet Management</CardTitle>
                                    <CardDescription>
                                        Monitor and manage all buses in the
                                        fleet
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {busFleet.map((bus) => (
                                            <div
                                                key={bus.id}
                                                className="flex items-center justify-between p-4 border rounded-lg"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                                        <Truck className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {bus.id}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {bus.route} •
                                                            Driver: {bus.driver}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Last Service:{' '}
                                                            {bus.lastService}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <Badge
                                                        variant={getStatusColor(
                                                            bus.status,
                                                        )}
                                                    >
                                                        {bus.status}
                                                    </Badge>
                                                    <div className="text-right">
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {bus.students}{' '}
                                                            students
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="routes" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Route Management</CardTitle>
                                    <CardDescription>
                                        Manage routes, stops, and scheduling
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {routes.map((route) => (
                                            <div
                                                key={route.id}
                                                className="p-4 border rounded-lg"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                                            Route {route.id}:{' '}
                                                            {route.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Distance:{' '}
                                                            {route.distance} •
                                                            Stops: {route.stops}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        Edit Route
                                                    </Button>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Assigned Buses
                                                        </p>
                                                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                            {route.buses}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Students
                                                        </p>
                                                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                            {route.students}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="maintenance" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Maintenance Schedule</CardTitle>
                                    <CardDescription>
                                        Upcoming and pending maintenance
                                        activities
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {maintenanceSchedule.map(
                                            (maintenance, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-4 border rounded-lg"
                                                >
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {maintenance.bus}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {maintenance.type}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {maintenance.date}
                                                        </p>
                                                        <Badge
                                                            variant={
                                                                maintenance.status ===
                                                                'Scheduled'
                                                                    ? 'success'
                                                                    : 'warning'
                                                            }
                                                        >
                                                            {maintenance.status}
                                                        </Badge>
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

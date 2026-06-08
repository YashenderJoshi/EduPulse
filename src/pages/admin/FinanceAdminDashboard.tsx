import { motion } from 'framer-motion';
import {
    BarChart3,
    CreditCard,
    DollarSign,
    Download,
    FileText,
    PieChart,
    Receipt,
    TrendingUp,
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
import { formatCurrency } from '../../lib/utils';

const financialStats = [
    {
        label: 'Total Revenue',
        value: 8750000,
        icon: DollarSign,
        color: 'text-green-600',
        bg: 'bg-green-50',
        trend: '+15%',
    },
    {
        label: 'Pending Payments',
        value: 1250000,
        icon: CreditCard,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        trend: '-8%',
    },
    {
        label: 'Monthly Collection',
        value: 750000,
        icon: TrendingUp,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        trend: '+12%',
    },
    {
        label: 'Outstanding Dues',
        value: 450000,
        icon: Receipt,
        color: 'text-red-600',
        bg: 'bg-red-50',
        trend: '-5%',
    },
];

const recentTransactions = [
    {
        id: 'TXN001',
        student: 'Rahul Sharma',
        amount: 45000,
        type: 'Semester Fee',
        status: 'Completed',
        date: '2024-01-25',
    },
    {
        id: 'TXN002',
        student: 'Priya Patel',
        amount: 1500,
        type: 'Exam Fee',
        status: 'Completed',
        date: '2024-01-24',
    },
    {
        id: 'TXN003',
        student: 'Amit Kumar',
        amount: 3000,
        type: 'Transport Fee',
        status: 'Pending',
        date: '2024-01-23',
    },
    {
        id: 'TXN004',
        student: 'Neha Singh',
        amount: 2500,
        type: 'Library Fee',
        status: 'Failed',
        date: '2024-01-22',
    },
];

const paymentMethods = [
    { method: 'UPI', percentage: 45, amount: 3937500, color: 'bg-blue-500' },
    {
        method: 'Bank Transfer',
        percentage: 30,
        amount: 2625000,
        color: 'bg-green-500',
    },
    {
        method: 'Card Payment',
        percentage: 20,
        amount: 1750000,
        color: 'bg-purple-500',
    },
    { method: 'Cash', percentage: 5, amount: 437500, color: 'bg-gray-500' },
];

const monthlyRevenue = [
    { month: 'Jan', revenue: 850000, target: 800000 },
    { month: 'Feb', revenue: 920000, target: 850000 },
    { month: 'Mar', revenue: 780000, target: 800000 },
    { month: 'Apr', revenue: 1100000, target: 900000 },
    { month: 'May', revenue: 950000, target: 900000 },
    { month: 'Jun', revenue: 1200000, target: 1000000 },
];

export function FinanceAdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <Layout title="Finance Administration">
            <div className="space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-600 rounded-xl">
                            <DollarSign className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Finance Administration
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Manage payments, fees, and financial operations
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export Report
                        </Button>
                        <Badge variant="outline" className="w-fit">
                            Finance Admin
                        </Badge>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {financialStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                        >
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {stat.label}
                                        </p>
                                        <div
                                            className={`p-2 rounded-lg ${stat.bg}`}
                                        >
                                            <stat.icon
                                                className={`h-5 w-5 ${stat.color}`}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {formatCurrency(stat.value)}
                                        </p>
                                        <span
                                            className={`text-sm font-medium ${
                                                stat.trend.startsWith('+')
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {stat.trend}
                                        </span>
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
                            <TabsTrigger value="transactions">
                                Transactions
                            </TabsTrigger>
                            <TabsTrigger value="analytics">
                                Analytics
                            </TabsTrigger>
                            <TabsTrigger value="reports">Reports</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Transactions */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Receipt className="h-5 w-5" />
                                            Recent Transactions
                                        </CardTitle>
                                        <CardDescription>
                                            Latest payment activities
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentTransactions.map(
                                                (transaction) => (
                                                    <div
                                                        key={transaction.id}
                                                        className="flex items-center justify-between p-3 rounded-lg border"
                                                    >
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {
                                                                    transaction.student
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {
                                                                    transaction.type
                                                                }{' '}
                                                                •{' '}
                                                                {
                                                                    transaction.date
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                                {formatCurrency(
                                                                    transaction.amount,
                                                                )}
                                                            </p>
                                                            <Badge
                                                                variant={
                                                                    transaction.status ===
                                                                    'Completed'
                                                                        ? 'success'
                                                                        : transaction.status ===
                                                                          'Pending'
                                                                        ? 'warning'
                                                                        : 'destructive'
                                                                }
                                                                className="text-xs"
                                                            >
                                                                {
                                                                    transaction.status
                                                                }
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Payment Methods */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <PieChart className="h-5 w-5" />
                                            Payment Methods
                                        </CardTitle>
                                        <CardDescription>
                                            Distribution by payment type
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {paymentMethods.map((method) => (
                                                <div
                                                    key={method.method}
                                                    className="space-y-2"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {method.method}
                                                        </span>
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            {method.percentage}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full ${method.color}`}
                                                            style={{
                                                                width: `${method.percentage}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {formatCurrency(
                                                            method.amount,
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="transactions" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>All Transactions</CardTitle>
                                    <CardDescription>
                                        Complete transaction history and
                                        management
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-12">
                                        <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            Transaction Management
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            View and manage all payment
                                            transactions
                                        </p>
                                        <Button>View Fee Management</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="analytics" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="h-5 w-5" />
                                        Revenue Analytics
                                    </CardTitle>
                                    <CardDescription>
                                        Monthly revenue vs targets
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {monthlyRevenue.map((data) => (
                                            <div
                                                key={data.month}
                                                className="space-y-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {data.month}
                                                    </span>
                                                    <div className="text-right">
                                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                            {formatCurrency(
                                                                data.revenue,
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Target:{' '}
                                                            {formatCurrency(
                                                                data.target,
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                                    <div
                                                        className={`h-3 rounded-full ${
                                                            data.revenue >=
                                                            data.target
                                                                ? 'bg-green-500'
                                                                : 'bg-yellow-500'
                                                        }`}
                                                        style={{
                                                            width: `${Math.min(
                                                                (data.revenue /
                                                                    data.target) *
                                                                    100,
                                                                100,
                                                            )}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="reports" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Financial Reports
                                    </CardTitle>
                                    <CardDescription>
                                        Generate and download financial reports
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            {
                                                title: 'Monthly Revenue Report',
                                                desc: 'Detailed monthly financial overview',
                                            },
                                            {
                                                title: 'Payment Analytics',
                                                desc: 'Payment method and trend analysis',
                                            },
                                            {
                                                title: 'Outstanding Dues',
                                                desc: 'List of pending payments and dues',
                                            },
                                            {
                                                title: 'Fee Collection Summary',
                                                desc: 'Comprehensive fee collection data',
                                            },
                                        ].map((report, index) => (
                                            <div
                                                key={index}
                                                className="p-4 border rounded-lg"
                                            >
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                    {report.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                    {report.desc}
                                                </p>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="gap-2"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </Button>
                                            </div>
                                        ))}
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

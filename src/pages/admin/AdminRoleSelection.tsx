import { motion } from 'framer-motion';
import {
    ChevronDown,
    DollarSign,
    GraduationCap,
    Shield,
    Truck,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import { useAuth } from '../../hooks/useAuth';

const adminRoles = [
    {
        id: 'super-admin',
        title: 'Super Admin',
        description: 'Full system access and control',
        icon: Shield,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        borderColor: 'border-purple-200 dark:border-purple-800',
        permissions: [
            'All system functions',
            'User management',
            'System configuration',
            'Reports & Analytics',
        ],
        dashboardPath: '/admin/dashboard',
    },
    {
        id: 'faculty-admin',
        title: 'Faculty Admin',
        description: 'Manage faculty and academic operations',
        icon: GraduationCap,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        permissions: [
            'Faculty management',
            'Timetable scheduling',
            'Academic records',
            'Student attendance',
        ],
        dashboardPath: '/admin/faculty-dashboard',
    },
    {
        id: 'finance-admin',
        title: 'Finance Admin',
        description: 'Handle financial operations and fee management',
        icon: DollarSign,
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        borderColor: 'border-green-200 dark:border-green-800',
        permissions: [
            'Fee management',
            'Payment processing',
            'Financial reports',
            'Invoice generation',
        ],
        dashboardPath: '/admin/finance-dashboard',
    },
    {
        id: 'transport-admin',
        title: 'Transport Admin',
        description: 'Manage transportation and logistics',
        icon: Truck,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        borderColor: 'border-orange-200 dark:border-orange-800',
        permissions: [
            'Vehicle management',
            'Route planning',
            'Driver management',
            'Transport fees',
        ],
        dashboardPath: '/admin/transport-dashboard',
    },
];

export function AdminRoleSelection() {
    const [selectedRole, setSelectedRole] = useState('');
    const navigate = useNavigate();
    const { user, login } = useAuth();

    const handleRoleSelection = () => {
        if (!selectedRole || !user) return;

        const roleData = adminRoles.find((role) => role.id === selectedRole);
        if (!roleData) return;

        // Update user with selected admin role
        const updatedUser = {
            ...user,
            adminRole: selectedRole,
        };

        login(updatedUser);
        navigate(roleData.dashboardPath);
    };

    const selectedRoleData = adminRoles.find(
        (role) => role.id === selectedRole,
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-4"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="p-3 bg-blue-600 rounded-xl">
                            <Shield className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Admin Portal
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Welcome{' '}
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {user?.name}
                        </span>
                        ! Please select your admin role to access the
                        appropriate dashboard.
                    </p>
                </motion.div>

                {/* Role Selection */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="p-6">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-2xl font-bold">
                                Select Your Admin Role
                            </CardTitle>
                            <CardDescription className="text-lg">
                                Choose the role that matches your
                                responsibilities and access permissions
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Dropdown Selection */}
                            <div className="space-y-2">
                                <Select
                                    value={selectedRole}
                                    onValueChange={setSelectedRole}
                                >
                                    <SelectTrigger className="w-full h-14 text-lg border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                                        <SelectValue placeholder="Choose your administrative role" />
                                        <ChevronDown className="h-5 w-5" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {adminRoles.map((role) => {
                                            const IconComponent = role.icon;
                                            return (
                                                <SelectItem
                                                    key={role.id}
                                                    value={role.id}
                                                    className="py-3"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <IconComponent
                                                            className={`h-5 w-5 ${role.color}`}
                                                        />
                                                        <div>
                                                            <div className="font-medium">
                                                                {role.title}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {
                                                                    role.description
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Selected Role Details */}
                            {selectedRoleData && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <Card
                                        className={`${selectedRoleData.bgColor} ${selectedRoleData.borderColor} border-2`}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className={`p-3 rounded-lg ${selectedRoleData.bgColor}`}
                                                >
                                                    <selectedRoleData.icon
                                                        className={`h-8 w-8 ${selectedRoleData.color}`}
                                                    />
                                                </div>
                                                <div className="flex-1 space-y-3">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                            {
                                                                selectedRoleData.title
                                                            }
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            {
                                                                selectedRoleData.description
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                            <Shield className="h-4 w-4" />
                                                            Access Permissions:
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedRoleData.permissions.map(
                                                                (
                                                                    permission,
                                                                    index,
                                                                ) => (
                                                                    <Badge
                                                                        key={
                                                                            index
                                                                        }
                                                                        variant="secondary"
                                                                        className="text-xs px-3 py-1"
                                                                    >
                                                                        {
                                                                            permission
                                                                        }
                                                                    </Badge>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}

                            {/* Action Button */}
                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    onClick={handleRoleSelection}
                                    disabled={!selectedRole}
                                    className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-all duration-200"
                                    size="lg"
                                >
                                    {selectedRole
                                        ? 'Access Dashboard'
                                        : 'Please Select a Role'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Quick Access Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {adminRoles.map((role, index) => {
                        const IconComponent = role.icon;
                        return (
                            <motion.div
                                key={role.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.1 * index,
                                }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="cursor-pointer"
                                onClick={() => setSelectedRole(role.id)}
                            >
                                <Card
                                    className={`h-full transition-all duration-300 hover:shadow-xl cursor-pointer group ${
                                        selectedRole === role.id
                                            ? `${role.borderColor} border-2 ${role.bgColor} shadow-lg`
                                            : 'hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                                    }`}
                                >
                                    <CardContent className="p-6 text-center space-y-4 h-full flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <div
                                                className={`p-4 rounded-full ${role.bgColor} w-fit mx-auto group-hover:scale-110 transition-transform duration-200`}
                                            >
                                                <IconComponent
                                                    className={`h-8 w-8 ${role.color}`}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                                                    {role.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                    {role.description}
                                                </p>
                                            </div>
                                        </div>
                                        {selectedRole === role.id && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                className="mt-3"
                                            >
                                                <Badge
                                                    className={`${role.color} bg-opacity-10`}
                                                >
                                                    Selected
                                                </Badge>
                                            </motion.div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}

import {
    BarChart3,
    Bell,
    BookOpen,
    Bus,
    Calendar,
    ClipboardList,
    CreditCard,
    DollarSign,
    FileText,
    GraduationCap,
    Home,
    LogOut,
    UserCheck,
    Users,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

interface SidebarProps {
    userRole: 'student' | 'admin';
}

const studentNavItems = [
    { icon: Home, label: 'Dashboard', href: '/student/dashboard' },
    { icon: UserCheck, label: 'Attendance', href: '/student/attendance' },
    { icon: CreditCard, label: 'Fees', href: '/student/fees' },
    { icon: FileText, label: 'Leave Application', href: '/student/leave' },
    { icon: Bell, label: 'Notifications', href: '/student/notifications' },
    { icon: Calendar, label: 'Timetable', href: '/student/timetable' },
    { icon: Users, label: 'Faculty Contacts', href: '/student/faculty' },
];

// Super Admin - Full access
const superAdminNavItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
    {
        icon: GraduationCap,
        label: 'Student Management',
        href: '/admin/students',
    },
    {
        icon: BarChart3,
        label: 'Attendance Monitoring',
        href: '/admin/attendance',
    },
    { icon: DollarSign, label: 'Fee Management', href: '/admin/fees' },
    { icon: ClipboardList, label: 'Leave Requests', href: '/admin/leave' },
    { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
    { icon: Calendar, label: 'Timetable Management', href: '/admin/timetable' },
    { icon: BookOpen, label: 'Faculty Directory', href: '/admin/faculty' },
    { icon: Bus, label: 'Transport Management', href: '/admin/transport' },
];

// Faculty Admin - Academic focused
const facultyAdminNavItems = [
    {
        icon: Home,
        label: 'Faculty Dashboard',
        href: '/admin/faculty-dashboard',
    },
    {
        icon: GraduationCap,
        label: 'Student Management',
        href: '/admin/students',
    },
    {
        icon: BarChart3,
        label: 'Attendance Monitoring',
        href: '/admin/attendance',
    },
    { icon: Calendar, label: 'Timetable Management', href: '/admin/timetable' },
    { icon: BookOpen, label: 'Faculty Directory', href: '/admin/faculty' },
    { icon: ClipboardList, label: 'Leave Requests', href: '/admin/leave' },
    { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
];

// Finance Admin - Financial operations
const financeAdminNavItems = [
    {
        icon: Home,
        label: 'Finance Dashboard',
        href: '/admin/finance-dashboard',
    },
    { icon: DollarSign, label: 'Fee Management', href: '/admin/fees' },
    {
        icon: GraduationCap,
        label: 'Student Management',
        href: '/admin/students',
    },
    { icon: ClipboardList, label: 'Leave Requests', href: '/admin/leave' },
    { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
];

// Transport Admin - Transportation focused
const transportAdminNavItems = [
    {
        icon: Home,
        label: 'Transport Dashboard',
        href: '/admin/transport-dashboard',
    },
    { icon: Bus, label: 'Transport Management', href: '/admin/transport' },
    {
        icon: GraduationCap,
        label: 'Student Management',
        href: '/admin/students',
    },
    { icon: ClipboardList, label: 'Leave Requests', href: '/admin/leave' },
    { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
];

// Fallback admin navigation for unknown roles
const adminNavItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
    {
        icon: GraduationCap,
        label: 'Student Management',
        href: '/admin/students',
    },
    {
        icon: BarChart3,
        label: 'Attendance Monitoring',
        href: '/admin/attendance',
    },
    { icon: DollarSign, label: 'Fee Management', href: '/admin/fees' },
    { icon: ClipboardList, label: 'Leave Requests', href: '/admin/leave' },
    { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
    { icon: Calendar, label: 'Timetable Management', href: '/admin/timetable' },
    { icon: BookOpen, label: 'Faculty Directory', href: '/admin/faculty' },
    { icon: Bus, label: 'Transport Management', href: '/admin/transport' },
];

export function Sidebar({ userRole }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    // Determine navigation items based on user role and admin role
    const getNavItems = () => {
        if (userRole === 'student') {
            return studentNavItems;
        }

        // For admin users, determine based on their specific admin role
        switch (user?.adminRole) {
            case 'super-admin':
                return superAdminNavItems;
            case 'faculty-admin':
                return facultyAdminNavItems;
            case 'finance-admin':
                return financeAdminNavItems;
            case 'transport-admin':
                return transportAdminNavItems;
            default:
                return adminNavItems; // Fallback to general admin nav
        }
    };

    const navItems = getNavItems();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-gray-200 p-6 dark:border-gray-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                    <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Edu Pulse
                    </h1>
                    <p className="text-xs text-gray-500 capitalize">
                        {userRole === 'admin' && user?.adminRole
                            ? user.adminRole.replace('-', ' ') + ' Portal'
                            : userRole + ' Portal'}
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-700',
                                isActive
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                    : 'text-gray-600 dark:text-gray-300',
                            )}
                        >
                            <item.icon
                                className={cn(
                                    'h-4 w-4',
                                    isActive
                                        ? 'text-blue-700 dark:text-blue-300'
                                        : 'text-gray-400',
                                )}
                            />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile & Logout */}
            <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {user?.role === 'student'
                                ? user?.studentId
                                : user?.adminRole
                                ? user.adminRole
                                      .replace('-', ' ')
                                      .replace(/\b\w/g, (l) => l.toUpperCase())
                                : 'Admin'}
                        </p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start gap-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}

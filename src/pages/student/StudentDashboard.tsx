import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  UserCheck,
  CreditCard,
  FileText,
  Bell,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

import api from '../../api/axios'
import { Layout } from '../../components/common/Layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { useAuth } from '../../hooks/useAuth'

export default function StudentDashboard() {

  const { user } = useAuth()

  const [dashboard, setDashboard] = useState<any>({})
  const [attendancePct, setAttendancePct] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const dashboardRes = await api.get("/students/dashboard")
      const attendanceRes = await api.get("/students/attendance-analytics")

      setDashboard(dashboardRes.data || {})
      setAttendancePct(attendanceRes.data?.percentage || 0)

    } catch (err) {
      console.error("Dashboard load error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="p-10 text-center text-gray-500">
          Loading dashboard...
        </div>
      </Layout>
    )
  }

  const notificationCount = Array.isArray(dashboard.notifications)
    ? dashboard.notifications.length
    : dashboard.notifications ?? 0

  const cards = [
    {
      title: 'Attendance',
      value: `${attendancePct}%`,
      description: 'Current semester',
      icon: UserCheck,
      status: attendancePct >= 75 ? 'good' : 'warning'
    },
    {
      title: 'Fees Due',
      value: dashboard.pendingFees ?? 0,
      description: 'Pending amount',
      icon: CreditCard,
      status: 'pending'
    },
    {
      title: 'Pending Leaves',
      value: dashboard.pendingLeaves ?? 0,
      description: 'Awaiting approval',
      icon: FileText,
      status: 'pending'
    },
    {
      title: 'Notifications',
      value: notificationCount,
      description: 'Unread messages',
      icon: Bell,
      status: 'new'
    }
  ]

  return (
    <Layout title="Dashboard">
      <div className="space-y-8">

        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              {user?.studentId} • {user?.department}
            </p>
          </div>
        </motion.div>

        {/* Attendance Alert */}
        {attendancePct < 75 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">
                  Attendance Alert
                </h3>
                <p className="text-red-600">
                  Your attendance is below 75%. Please improve it.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  <card.icon className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">
                    {card.value}
                  </div>
                  <p className="text-xs text-gray-500">
                    {card.description}
                  </p>

                  <div className="mt-3">
                    <Badge
                      variant={
                        card.status === 'good'
                          ? 'success'
                          : card.status === 'warning'
                          ? 'warning'
                          : card.status === 'pending'
                          ? 'destructive'
                          : 'default'
                      }
                    >
                      {card.status === 'good'
                        ? 'Good'
                        : card.status === 'warning'
                        ? 'Low'
                        : card.status === 'pending'
                        ? 'Action Required'
                        : 'New'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notifications
              </CardTitle>
              <CardDescription>
                Latest updates from your college
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.isArray(dashboard.notifications) &&
                dashboard.notifications.slice(0, 3).map((n: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="h-2 w-2 rounded-full mt-2 bg-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {n.date ? new Date(n.date).toLocaleDateString() : ""}
                      </p>
                    </div>
                  </div>
                ))}
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Notifications
              </Button>
            </CardContent>
          </Card>

          {/* Placeholder Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>
                Your classes for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                Schedule integration coming soon.
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </Layout>
  )
}
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Plus, Edit, Trash2, Send, Users, AlertCircle } from 'lucide-react'
import api from '../../api/axios'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { Badge } from '../../components/ui/badge'
import { Layout } from '../../components/common/Layout'

export function NotificationManagement() {

  const [notifications, setNotifications] = useState<any[]>([])

  const [showCreateModal, setShowCreateModal] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: '',
    priority: 'Medium'
  })

  const targetOptions = [
    'All Students',
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Year 1',
    'Year 2',
    'Year 3',
    'Year 4'
  ]

  /* ================= LOAD NOTIFICATIONS ================= */

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {

    try {

      const res = await api.get("/students/notifications")

      if (Array.isArray(res.data)) {
        setNotifications(res.data)
      } else {
        setNotifications([])
      }

    } catch (err) {

      console.error("Notification fetch failed", err)

      setNotifications([])

    }

  }

  /* ================= CREATE NOTIFICATION ================= */

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    try {

      await api.post("/students/notifications", {
        title: formData.title,
        content: formData.content,
        targetAudience: formData.targetAudience,
        priority: formData.priority,
        type: "Admin"
      })

      fetchNotifications()

      setShowCreateModal(false)

      setFormData({
        title: '',
        content: '',
        targetAudience: '',
        priority: 'Medium'
      })

    } catch (err) {

      console.error("Notification creation failed", err)

    }

  }

  /* ================= STATS ================= */

  const total = notifications.length

  const highPriority = notifications.filter(n => n.priority === "High").length

  const thisMonth = notifications.filter(n => {
    if (!n.date) return false
    const d = new Date(n.date)
    const now = new Date()
    return d.getMonth() === now.getMonth()
  }).length

  const totalViews = notifications.length * 50

  return (

    <Layout title="Notification Management">

      <div className="space-y-8">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >

          <div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Notification Management
            </h1>

            <p className="text-gray-600 dark:text-gray-400">
              Create and manage notifications for students and faculty
            </p>

          </div>

          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>

            <DialogTrigger asChild>

              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Notification
              </Button>

            </DialogTrigger>

            <DialogContent className="max-w-lg">

              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-2">

                  <label className="text-sm font-medium">Title</label>

                  <Input
                    placeholder="Enter notification title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />

                </div>

                <div className="space-y-2">

                  <label className="text-sm font-medium">Content</label>

                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24"
                    placeholder="Enter notification content..."
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    required
                  />

                </div>

                <div className="grid grid-cols-2 gap-3">

                  <div className="space-y-2">

                    <label className="text-sm font-medium">
                      Target Audience
                    </label>

                    <Select
                      value={formData.targetAudience}
                      onValueChange={(value) =>
                        setFormData({ ...formData, targetAudience: value })
                      }
                    >

                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>

                      <SelectContent>

                        {targetOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}

                      </SelectContent>

                    </Select>

                  </div>

                  <div className="space-y-2">

                    <label className="text-sm font-medium">Priority</label>

                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        setFormData({ ...formData, priority: value })
                      }
                    >

                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>

                      </SelectContent>

                    </Select>

                  </div>

                </div>

                <div className="flex gap-3 pt-4">

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>

                  <Button type="submit" className="flex-1 gap-2">
                    <Send className="h-4 w-4" />
                    Publish
                  </Button>

                </div>

              </form>

            </DialogContent>

          </Dialog>

        </motion.div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-blue-600">{total}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-green-600">{thisMonth}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-purple-600">
                {totalViews}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {highPriority}
              </p>
            </CardContent>
          </Card>

        </div>

        {/* LIST */}

        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Published Notifications
            </CardTitle>

            <CardDescription>
              Manage your published notifications and announcements
            </CardDescription>

          </CardHeader>

          <CardContent className="space-y-4">

            {notifications.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                No notifications yet.
              </div>
            )}

            {notifications.map((notification, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border rounded-lg space-y-3"
              >

                <div className="flex justify-between">

                  <div>

                    <div className="flex items-center gap-2 mb-2">

                      <h3 className="font-semibold">
                        {notification.title}
                      </h3>

                      <Badge
                        variant={
                          notification.priority === 'High'
                            ? 'destructive'
                            : notification.priority === 'Medium'
                            ? 'warning'
                            : 'secondary'
                        }
                      >
                        {notification.priority}
                      </Badge>

                    </div>

                    <p className="text-sm text-gray-600">
                      {notification.content}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {notification.date
                        ? new Date(notification.date).toLocaleDateString()
                        : ""}
                    </p>

                  </div>

                </div>

              </motion.div>

            ))}

          </CardContent>

        </Card>

      </div>

    </Layout>

  )

}
import React, { useEffect, useState } from 'react'
import { Bell, Moon, Sun, Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { useTheme } from '../../hooks/useTheme'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import api from '../../api/axios'

interface HeaderProps {
title: string
onMenuClick?: () => void
}

export function Header({ title, onMenuClick }: HeaderProps) {

const { theme, toggleTheme } = useTheme()
const { user } = useAuth()
const navigate = useNavigate()

const [notificationCount, setNotificationCount] = useState(0)

useEffect(() => {
loadNotifications()
}, [])

const loadNotifications = async () => {
try {


  const res = await api.get("/students/notifications")

  if (Array.isArray(res.data)) {
    setNotificationCount(res.data.length)
  }

} catch (err) {

  console.error("Notification count fetch failed", err)

}


}

const openNotifications = () => {


if (!user) return

if (user.role === "admin") {
  navigate("/admin/notifications")
} else {
  navigate("/student/notifications")
}


}

return ( <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-800">


  <div className="flex items-center gap-4">

    {onMenuClick && (
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="md:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
    )}

    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
      {title}
    </h1>

  </div>

  <div className="flex items-center gap-3">

    <div className="relative">

      <Button
        variant="ghost"
        size="icon"
        onClick={openNotifications}
      >
        <Bell className="h-5 w-5" />
      </Button>

      {notificationCount > 0 && (
        <Badge
          variant="destructive"
          className="pointer-events-none absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
        >
          {notificationCount}
        </Badge>
      )}

    </div>

    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>

  </div>

</header>


)
}

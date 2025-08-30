"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, X, Check } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"

interface Notification {
  id: string
  type: "success" | "info" | "warning"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { isConnected, address } = useWallet()

  useEffect(() => {
    if (isConnected) {
      // Add welcome notification when wallet connects
      const welcomeNotification: Notification = {
        id: Date.now().toString(),
        type: "success",
        title: "Wallet Connected!",
        message: "You can now start making donations and earning ImpactPass NFTs.",
        timestamp: new Date(),
        read: false,
      }
      setNotifications((prev) => [welcomeNotification, ...prev])
    }
  }, [isConnected])

  useEffect(() => {
    // Simulate periodic notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance every 20 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? "info" : "success",
          title: "New Impact Update",
          message: "A project you supported has reached a new milestone!",
          timestamp: new Date(),
          read: false,
        }
        setNotifications((prev) => [newNotification, ...prev.slice(0, 9)])
      }
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "✅"
      case "info":
        return "ℹ️"
      case "warning":
        return "⚠️"
      default:
        return "📢"
    }
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "border-l-emerald-500 bg-emerald-50"
      case "info":
        return "border-l-blue-500 bg-blue-50"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative p-2">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 z-50">
          <Card className="shadow-lg border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-1">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto space-y-2">
              {notifications.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No notifications yet</p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border-l-4 ${getNotificationColor(notification.type)} ${
                      !notification.read ? "bg-opacity-100" : "bg-opacity-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1">
                        <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-600"}`}
                          >
                            {notification.title}
                          </h4>
                          <p className={`text-xs mt-1 ${!notification.read ? "text-gray-700" : "text-gray-500"}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{notification.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 h-6 w-6"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification.id)}
                          className="p-1 h-6 w-6"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

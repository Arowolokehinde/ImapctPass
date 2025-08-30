"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { X, Check, AlertCircle, Info } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"

interface Toast {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Date.now().toString()
    const newToast = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, toast.duration || 5000)
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const getToastIcon = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return <Check className="h-5 w-5 text-emerald-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getToastStyles = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "bg-emerald-50 border-emerald-200 text-emerald-900"
      case "error":
        return "bg-red-50 border-red-200 text-red-900"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-900"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-900"
    }
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast, index) => (
          <FadeIn key={toast.id} delay={index * 0.1}>
            <div className={`max-w-sm w-full rounded-lg border p-4 shadow-lg ${getToastStyles(toast.type)}`}>
              <div className="flex items-start gap-3">
                {getToastIcon(toast.type)}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium">{toast.title}</h4>
                  {toast.message && <p className="text-sm mt-1 opacity-90">{toast.message}</p>}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 p-1 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

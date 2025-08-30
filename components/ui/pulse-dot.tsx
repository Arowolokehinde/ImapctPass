"use client"

interface PulseDotProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function PulseDot({ className = "", size = "md" }: PulseDotProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  }

  return (
    <div className={`relative ${className}`}>
      <div className={`${sizeClasses[size]} bg-emerald-500 rounded-full animate-pulse`} />
      <div className={`absolute inset-0 ${sizeClasses[size]} bg-emerald-500 rounded-full animate-ping opacity-75`} />
    </div>
  )
}

import { AlertTriangle, CheckCircle, Info } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "warning",
    message: "High energy consumption in GKB-102",
    time: "2 minutes ago",
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: "success",
    message: "Optimal temperature achieved in GKB-201",
    time: "15 minutes ago",
    icon: CheckCircle,
  },
  {
    id: 3,
    type: "info",
    message: "Scheduled maintenance for GKB-301",
    time: "1 hour ago",
    icon: Info,
  },
]

const getAlertColor = (type: string) => {
  switch (type) {
    case "warning":
      return "text-orange-600 bg-orange-100"
    case "success":
      return "text-green-600 bg-green-100"
    case "info":
      return "text-blue-600 bg-blue-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}

export default function RecentAlerts() {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
          <div className={`p-1 rounded-full ${getAlertColor(alert.type)}`}>
            <alert.icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900">{alert.message}</p>
            <p className="text-xs text-slate-500">{alert.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

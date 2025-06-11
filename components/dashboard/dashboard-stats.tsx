import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Thermometer, Users, Zap, Building2 } from "lucide-react"

const stats = [
  {
    title: "Active Rooms",
    value: "24",
    change: "+2",
    trend: "up",
    icon: Building2,
    color: "bg-blue-500",
  },
  {
    title: "Avg Temperature",
    value: "22.5°C",
    change: "-0.5°C",
    trend: "down",
    icon: Thermometer,
    color: "bg-green-500",
  },
  {
    title: "Total Occupancy",
    value: "156",
    change: "+12",
    trend: "up",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Energy Saved",
    value: "32%",
    change: "+5%",
    trend: "up",
    icon: Zap,
    color: "bg-orange-500",
  },
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <div className="flex items-center mt-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

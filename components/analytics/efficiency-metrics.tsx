import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Target, Award } from "lucide-react"

const metrics = [
  {
    title: "Overall Efficiency",
    value: 87,
    target: 90,
    trend: "up",
    change: "+5%",
    icon: Target,
  },
  {
    title: "Energy Optimization",
    value: 92,
    target: 85,
    trend: "up",
    change: "+8%",
    icon: Award,
  },
  {
    title: "Temperature Accuracy",
    value: 94,
    target: 95,
    trend: "down",
    change: "-2%",
    icon: Target,
  },
  {
    title: "Response Time",
    value: 78,
    target: 80,
    trend: "up",
    change: "+3%",
    icon: TrendingUp,
  },
]

export default function EfficiencyMetrics() {
  return (
    <div className="space-y-6">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <metric.icon className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold">{metric.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.change}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current: {metric.value}%</span>
                <span>Target: {metric.target}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

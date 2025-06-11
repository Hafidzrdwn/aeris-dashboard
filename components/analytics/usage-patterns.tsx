"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const usageData = [
  { name: "Lecture Halls", value: 45, color: "#3b82f6" },
  { name: "Seminar Rooms", value: 25, color: "#10b981" },
  { name: "Labs", value: 20, color: "#f59e0b" },
  { name: "Others", value: 10, color: "#8b5cf6" },
]

const timeData = [
  { period: "Morning (8-12)", usage: 85 },
  { period: "Afternoon (12-17)", usage: 95 },
  { period: "Evening (17-21)", usage: 60 },
  { period: "Night (21-8)", usage: 15 },
]

export default function UsagePatterns() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Room Type Usage Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={usageData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {usageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Peak Usage Times</h3>
        <div className="space-y-3">
          {timeData.map((item) => (
            <div key={item.period} className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.period}</span>
              <div className="flex items-center space-x-2 flex-1 mx-4">
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${item.usage}%` }} />
                </div>
                <span className="text-sm font-medium w-12">{item.usage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const energyData = [
  { month: "Jan", consumption: 1250, savings: 380, efficiency: 78 },
  { month: "Feb", consumption: 1180, savings: 420, efficiency: 82 },
  { month: "Mar", consumption: 1320, savings: 350, efficiency: 75 },
  { month: "Apr", consumption: 1100, savings: 480, efficiency: 85 },
  { month: "May", consumption: 1050, savings: 520, efficiency: 88 },
  { month: "Jun", consumption: 980, savings: 580, efficiency: 92 },
]

const dailyData = [
  { hour: "00", consumption: 45, efficiency: 85 },
  { hour: "04", consumption: 32, efficiency: 92 },
  { hour: "08", consumption: 78, efficiency: 78 },
  { hour: "12", consumption: 95, efficiency: 72 },
  { hour: "16", consumption: 88, efficiency: 75 },
  { hour: "20", consumption: 67, efficiency: 82 },
]

export default function EnergyAnalytics() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Monthly Energy Consumption</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="consumption" fill="#3b82f6" name="Consumption (kWh)" />
                <Bar dataKey="savings" fill="#10b981" name="Savings (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Daily Efficiency Pattern</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  name="Efficiency (%)"
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Total Energy Saved</h4>
          <p className="text-3xl font-bold">2,730 kWh</p>
          <p className="text-blue-100">This month</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Cost Savings</h4>
          <p className="text-3xl font-bold">$410</p>
          <p className="text-green-100">This month</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">CO₂ Reduced</h4>
          <p className="text-3xl font-bold">1.2 tons</p>
          <p className="text-purple-100">This month</p>
        </div>
      </div>
    </div>
  )
}

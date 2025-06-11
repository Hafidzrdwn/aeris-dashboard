"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const generateRoomData = (roomId: string) => {
  const baseTemp = 22 + Math.random() * 4
  const baseOccupancy = Math.floor(Math.random() * 40) + 10

  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, "0")}:00`,
    temperature: Math.round((baseTemp + Math.sin(i / 4) * 2 + Math.random() * 0.5) * 10) / 10,
    occupancy: Math.max(0, Math.floor(baseOccupancy + Math.sin(i / 3) * 15 + Math.random() * 5)),
    targetTemp: 23,
  }))
}

interface RoomChartProps {
  roomId: string
}

export default function RoomChart({ roomId }: RoomChartProps) {
  const data = generateRoomData(roomId)

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" stroke="#64748b" />
          <YAxis yAxisId="temp" orientation="left" stroke="#64748b" />
          <YAxis yAxisId="occupancy" orientation="right" stroke="#64748b" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="temperature"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Temperature (°C)"
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
          />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="targetTemp"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Target Temp (°C)"
            dot={false}
          />
          <Line
            yAxisId="occupancy"
            type="monotone"
            dataKey="occupancy"
            stroke="#f59e0b"
            strokeWidth={2}
            name="Occupancy"
            dot={{ fill: "#f59e0b", strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

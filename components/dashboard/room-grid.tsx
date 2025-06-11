import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Users, Zap } from "lucide-react"

const rooms = [
  {
    id: "GKB-101",
    name: "Lecture Hall A",
    temperature: 23,
    occupancy: 45,
    capacity: 60,
    status: "active",
    energyLevel: "optimal",
  },
  {
    id: "GKB-102",
    name: "Lecture Hall B",
    temperature: 24,
    occupancy: 32,
    capacity: 60,
    status: "active",
    energyLevel: "high",
  },
  {
    id: "GKB-201",
    name: "Seminar Room 1",
    temperature: 22,
    occupancy: 15,
    capacity: 30,
    status: "active",
    energyLevel: "optimal",
  },
  {
    id: "GKB-202",
    name: "Seminar Room 2",
    temperature: 25,
    occupancy: 8,
    capacity: 30,
    status: "idle",
    energyLevel: "low",
  },
  {
    id: "GKB-301",
    name: "Computer Lab",
    temperature: 21,
    occupancy: 28,
    capacity: 40,
    status: "active",
    energyLevel: "optimal",
  },
  {
    id: "GKB-302",
    name: "Research Lab",
    temperature: 23,
    occupancy: 12,
    capacity: 25,
    status: "active",
    energyLevel: "optimal",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "idle":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getEnergyColor = (level: string) => {
  switch (level) {
    case "optimal":
      return "text-green-600"
    case "high":
      return "text-orange-600"
    case "low":
      return "text-blue-600"
    default:
      return "text-gray-600"
  }
}

export default function RoomGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <Link key={room.id} href={`/rooms/${room.id}`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900">{room.name}</h3>
                <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Temperature</span>
                  </div>
                  <span className="font-medium">{room.temperature}°C</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Occupancy</span>
                  </div>
                  <span className="font-medium">
                    {room.occupancy}/{room.capacity}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Energy</span>
                  </div>
                  <span className={`font-medium ${getEnergyColor(room.energyLevel)}`}>{room.energyLevel}</span>
                </div>
              </div>

              <div className="mt-3 bg-slate-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${(room.occupancy / room.capacity) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

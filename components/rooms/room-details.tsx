import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Users, Zap, Wifi } from "lucide-react"
import { getRoomById } from "@/lib/data"

interface RoomDetailsProps {
  roomId: string
}

export default function RoomDetails({ roomId }: RoomDetailsProps) {
  const room = getRoomById(roomId)

  if (!room) {
    return <div>Room not found</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "idle":
        return "bg-yellow-100 text-yellow-800"
      case "maintenance":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-slate-600">Current Temp</p>
                <p className="text-xl font-bold">{room.temperature}°C</p>
                <p className="text-xs text-slate-500">Target: {room.targetTemperature}°C</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-slate-600">Occupancy</p>
                <p className="text-xl font-bold">{room.occupancy}</p>
                <p className="text-xs text-slate-500">Capacity: {room.capacity}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-slate-600">Energy Level</p>
                <p className="text-xl font-bold capitalize">{room.energyLevel}</p>
                <p className="text-xs text-slate-500">AC: {room.acStatus}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wifi className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-slate-600">Status</p>
                <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                <p className="text-xs text-slate-500 mt-1">Online</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Room Information</CardTitle>
          <CardDescription>Detailed room specifications and current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Location Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Building:</span>
                    <span className="font-medium">{room.building}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Floor:</span>
                    <span className="font-medium">{room.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Room ID:</span>
                    <span className="font-medium">{room.id}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">System Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last Updated:</span>
                    <span className="font-medium">{new Date(room.lastUpdated).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Occupancy Rate:</span>
                    <span className="font-medium">{Math.round((room.occupancy / room.capacity) * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Temperature Variance:</span>
                    <span className="font-medium">{(room.temperature - room.targetTemperature).toFixed(1)}°C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Thermometer, Users, Zap, Settings, MapPin, Clock } from "lucide-react"
import { rooms } from "@/lib/data"
import type { RoomFiltersType } from "@/app/rooms/page"

interface RoomListProps {
  filters: RoomFiltersType
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "idle":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "maintenance":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
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

const getACStatusColor = (status: string) => {
  switch (status) {
    case "on":
      return "bg-green-500"
    case "auto":
      return "bg-blue-500"
    case "off":
      return "bg-gray-400"
    default:
      return "bg-gray-400"
  }
}

export function RoomTime({ date }: { date: string }) {
  const [formatted, setFormatted] = useState("")

  useEffect(() => {
    const d = new Date(date)
    const f = d.toLocaleDateString()
    setFormatted(f)
  }, [date])

  return <p className="text-xs text-slate-500">{formatted}</p>
}

export default function RoomList({ filters }: RoomListProps) {
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {

      // Building filter
      if (filters.building && filters.building !== "all" && room.building !== filters.building) {
        return false
      }

      // Floor filter
      if (filters.floor && filters.floor !== "all" && room.floor.toString() !== filters.floor) {
        return false
      }

      // Status filter
      if (filters.status && filters.status !== "all" && room.status !== filters.status) {
        return false
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return (
          room.name.toLowerCase().includes(searchLower) ||
          room.id.toLowerCase().includes(searchLower) ||
          room.building.toLowerCase().includes(searchLower)
        )
      }

      return true
    })
  }, [filters])

  if (filteredRooms.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full">
          <Settings className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900">No rooms found</h3>
        <p className="mb-4 text-gray-500">
          {Object.values(filters).some(Boolean)
            ? "Try adjusting your filters to see more rooms."
            : "No rooms are currently available."}
        </p>
        {Object.values(filters).some(Boolean) && (
          <Button variant="outline" onClick={() => window.location.reload()}>
            Clear all filters
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredRooms.length} of {rooms.length} rooms
        </p>
      </div>

      {filteredRooms.map((room) => (
        <Card
          key={room.id}
          className="transition-all duration-200 border border-slate-200 hover:shadow-md hover:border-blue-200"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{room.name}</h3>
                    <p className="text-sm text-slate-600">
                      {room.building} - Floor {room.floor} • ID: {room.id}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                <Link href={`/rooms/${room.id}`}>
                  <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-5">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Thermometer className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Temperature</p>
                  <p className="text-sm font-semibold">{room.temperature}°C</p>
                  <p className="text-xs text-slate-500">Target: {room.targetTemperature}°C</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Occupancy</p>
                  <p className="text-sm font-semibold">
                    {room.occupancy}/{room.capacity}
                  </p>
                  <p className="text-xs text-slate-500">{Math.round((room.occupancy / room.capacity) * 100)}% full</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Zap className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Energy Level</p>
                  <p className={`font-semibold text-sm ${getEnergyColor(room.energyLevel)}`}>{room.energyLevel}</p>
                  <p className="text-xs text-slate-500">Efficiency</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-5 h-5">
                  <div className={`w-3 h-3 rounded-full ${getACStatusColor(room.acStatus)}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-600">AC Status</p>
                  <p className="text-sm font-semibold capitalize">{room.acStatus}</p>
                  <p className="text-xs text-slate-500">System</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Clock className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Last Updated</p>
                  <p className="text-sm font-semibold">
                    {new Date(room.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <RoomTime date={room.lastUpdated} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Occupancy Rate</span>
                <span>{Math.round((room.occupancy / room.capacity) * 100)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-2 transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${(room.occupancy / room.capacity) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

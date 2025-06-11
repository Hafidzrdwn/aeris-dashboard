// Dummy data for the AERIS system

export interface Room {
  id: string
  name: string
  building: string
  floor: number
  temperature: number
  targetTemperature: number
  occupancy: number
  capacity: number
  status: "active" | "idle" | "maintenance"
  energyLevel: "optimal" | "high" | "low"
  acStatus: "on" | "off" | "auto"
  lastUpdated: string
}

export interface EnergyData {
  timestamp: string
  consumption: number
  efficiency: number
  cost: number
}

export interface Alert {
  id: string
  type: "warning" | "error" | "info" | "success"
  message: string
  timestamp: string
  roomId?: string
  resolved: boolean
}

export const rooms: Room[] = [
  {
    id: "GKB-101",
    name: "Lecture Hall A",
    building: "GKB",
    floor: 1,
    temperature: 23.2,
    targetTemperature: 23.0,
    occupancy: 45,
    capacity: 60,
    status: "active",
    energyLevel: "optimal",
    acStatus: "auto",
    lastUpdated: "2024-01-15T10:30:00Z",
  },
  {
    id: "GKB-102",
    name: "Lecture Hall B",
    building: "GKB",
    floor: 1,
    temperature: 24.1,
    targetTemperature: 23.0,
    occupancy: 32,
    capacity: 60,
    status: "active",
    energyLevel: "high",
    acStatus: "on",
    lastUpdated: "2024-01-15T10:28:00Z",
  },
  {
    id: "GKB-201",
    name: "Seminar Room 1",
    building: "GKB",
    floor: 2,
    temperature: 22.8,
    targetTemperature: 23.0,
    occupancy: 15,
    capacity: 30,
    status: "active",
    energyLevel: "optimal",
    acStatus: "auto",
    lastUpdated: "2024-01-15T10:25:00Z",
  },
  {
    id: "GKB-202",
    name: "Seminar Room 2",
    building: "GKB",
    floor: 2,
    temperature: 25.3,
    targetTemperature: 24.0,
    occupancy: 8,
    capacity: 30,
    status: "idle",
    energyLevel: "low",
    acStatus: "off",
    lastUpdated: "2024-01-15T10:20:00Z",
  },
  {
    id: "GKB-301",
    name: "Computer Lab",
    building: "GKB",
    floor: 3,
    temperature: 21.5,
    targetTemperature: 22.0,
    occupancy: 28,
    capacity: 40,
    status: "active",
    energyLevel: "optimal",
    acStatus: "auto",
    lastUpdated: "2024-01-15T10:32:00Z",
  },
  {
    id: "GKB-302",
    name: "Research Lab",
    building: "GKB",
    floor: 3,
    temperature: 23.0,
    targetTemperature: 23.0,
    occupancy: 12,
    capacity: 25,
    status: "active",
    energyLevel: "optimal",
    acStatus: "auto",
    lastUpdated: "2024-01-15T10:29:00Z",
  },
]

export const energyData: EnergyData[] = [
  { timestamp: "2024-01-15T00:00:00Z", consumption: 45.2, efficiency: 85, cost: 12.3 },
  { timestamp: "2024-01-15T04:00:00Z", consumption: 32.1, efficiency: 92, cost: 8.75 },
  { timestamp: "2024-01-15T08:00:00Z", consumption: 78.5, efficiency: 78, cost: 21.4 },
  { timestamp: "2024-01-15T12:00:00Z", consumption: 95.3, efficiency: 72, cost: 26.85 },
  { timestamp: "2024-01-15T16:00:00Z", consumption: 88.7, efficiency: 75, cost: 24.2 },
  { timestamp: "2024-01-15T20:00:00Z", consumption: 67.2, efficiency: 82, cost: 18.35 },
]

export const alerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    message: "High energy consumption detected in GKB-102",
    timestamp: "2024-01-15T10:28:00Z",
    roomId: "GKB-102",
    resolved: false,
  },
  {
    id: "2",
    type: "success",
    message: "Optimal temperature achieved in GKB-201",
    timestamp: "2024-01-15T10:15:00Z",
    roomId: "GKB-201",
    resolved: true,
  },
  {
    id: "3",
    type: "info",
    message: "Scheduled maintenance for GKB-301 tomorrow",
    timestamp: "2024-01-15T09:30:00Z",
    roomId: "GKB-301",
    resolved: false,
  },
  {
    id: "4",
    type: "error",
    message: "Sensor malfunction in GKB-202",
    timestamp: "2024-01-15T08:45:00Z",
    roomId: "GKB-202",
    resolved: false,
  },
]

// Helper functions
export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id)
}

export function getRoomsByBuilding(building: string): Room[] {
  return rooms.filter((room) => room.building === building)
}

export function getRoomsByFloor(floor: number): Room[] {
  return rooms.filter((room) => room.floor === floor)
}

export function getActiveRooms(): Room[] {
  return rooms.filter((room) => room.status === "active")
}

export function getAverageTemperature(): number {
  const total = rooms.reduce((sum, room) => sum + room.temperature, 0)
  return Math.round((total / rooms.length) * 10) / 10
}

export function getTotalOccupancy(): number {
  return rooms.reduce((sum, room) => sum + room.occupancy, 0)
}

export function getEnergyEfficiency(): number {
  const optimalRooms = rooms.filter((room) => room.energyLevel === "optimal").length
  return Math.round((optimalRooms / rooms.length) * 100)
}

"use client"

import { useState } from "react"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Building2,
  Thermometer,
  Users,
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
  Search,
  Filter,
  Download,
  RefreshCw,
  Settings,
  MoreHorizontal,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { cn } from "@/lib/utils"

// Enhanced dummy data
const dashboardStats = [
  {
    title: "Active Rooms",
    value: "24",
    change: "+2",
    trend: "up",
    icon: Building2,
    color: "from-blue-500 to-blue-600",
    description: "Currently monitored",
  },
  {
    title: "Avg Temperature",
    value: "22.5°C",
    change: "-0.5°C",
    trend: "down",
    icon: Thermometer,
    color: "from-green-500 to-green-600",
    description: "Optimal range",
  },
  {
    title: "Total Occupancy",
    value: "156",
    change: "+12",
    trend: "up",
    icon: Users,
    color: "from-purple-500 to-purple-600",
    description: "People in rooms",
  },
  {
    title: "Energy Saved",
    value: "32%",
    change: "+5%",
    trend: "up",
    icon: Zap,
    color: "from-orange-500 to-orange-600",
    description: "This month",
  },
]

const energyData = [
  { time: "00:00", consumption: 45, efficiency: 85, target: 50 },
  { time: "04:00", consumption: 32, efficiency: 92, target: 45 },
  { time: "08:00", consumption: 78, efficiency: 78, target: 80 },
  { time: "12:00", consumption: 95, efficiency: 72, target: 90 },
  { time: "16:00", consumption: 88, efficiency: 75, target: 85 },
  { time: "20:00", consumption: 67, efficiency: 82, target: 70 },
  { time: "24:00", consumption: 52, efficiency: 88, target: 55 },
]

const roomData = [
  { name: "Lecture Halls", value: 45, color: "#3b82f6" },
  { name: "Seminar Rooms", value: 25, color: "#10b981" },
  { name: "Labs", value: 20, color: "#f59e0b" },
  { name: "Others", value: 10, color: "#8b5cf6" },
]

const recentAlerts = [
  {
    id: 1,
    type: "warning",
    title: "High Energy Consumption",
    message: "GKB-102 consuming 15% above normal",
    time: "2 minutes ago",
    icon: AlertTriangle,
    room: "GKB-102",
  },
  {
    id: 2,
    type: "success",
    title: "Optimal Temperature",
    message: "All systems running efficiently",
    time: "15 minutes ago",
    icon: CheckCircle,
    room: "GKB-201",
  },
  {
    id: 3,
    type: "info",
    title: "Scheduled Maintenance",
    message: "System update completed successfully",
    time: "1 hour ago",
    icon: Info,
    room: "GKB-301",
  },
]

const topRooms = [
  { id: "GKB-101", name: "Lecture Hall A", occupancy: 45, capacity: 60, efficiency: 92, temperature: 23.2 },
  { id: "GKB-102", name: "Lecture Hall B", occupancy: 32, capacity: 60, efficiency: 78, temperature: 24.1 },
  { id: "GKB-201", name: "Seminar Room 1", occupancy: 15, capacity: 30, efficiency: 95, temperature: 22.8 },
  { id: "GKB-301", name: "Computer Lab", occupancy: 28, capacity: 40, efficiency: 88, temperature: 21.5 },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const [searchQuery, setSearchQuery] = useState("")

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning":
        return "border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-300"
      case "success":
        return "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300"
      case "info":
        return "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300"
      default:
        return "border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <SidebarInset>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4 mr-2" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">AERIS</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-2 px-4 ml-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms, alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-8"
            />
          </div>
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Welcome Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text dark:from-blue-400 dark:to-purple-400">
              Welcome back, Hafidz! 👋
            </h1>
            <p className="text-muted-foreground">Here's what's happening with your smart cooling system today.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-green-700 border-green-200 bg-green-50 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900"
            >
              <Activity className="w-3 h-3 mr-1" />
              All Systems Online
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <Card
              key={stat.title}
              className={cn(
                "relative overflow-hidden border shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                "animate-slide-up dark:border-slate-800 dark:bg-slate-900/60",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5 dark:opacity-10", stat.color)} />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={cn("p-2 rounded-lg bg-gradient-to-br text-white", stat.color)}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                  )}
                  <span
                    className={
                      stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Energy Consumption Chart */}
          <Card className="border shadow-lg lg:col-span-2 dark:border-slate-800 dark:bg-slate-900/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Energy Consumption & Efficiency</CardTitle>
                  <CardDescription>Real-time monitoring of energy usage patterns</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="consumption" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="consumption">Consumption</TabsTrigger>
                  <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                </TabsList>
                <TabsContent value="consumption" className="space-y-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={energyData}>
                        <defs>
                          <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                        <XAxis dataKey="time" stroke="#64748b" className="dark:stroke-slate-400" />
                        <YAxis stroke="#64748b" className="dark:stroke-slate-400" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="consumption"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          fill="url(#consumptionGradient)"
                        />
                        <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="efficiency" className="space-y-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={energyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                        <XAxis dataKey="time" stroke="#64748b" className="dark:stroke-slate-400" />
                        <YAxis stroke="#64748b" className="dark:stroke-slate-400" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="efficiency"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Room Distribution */}
          <Card className="border shadow-lg dark:border-slate-800 dark:bg-slate-900/60">
            <CardHeader>
              <CardTitle>Room Distribution</CardTitle>
              <CardDescription>Usage by room type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roomData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {roomData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {roomData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Alerts */}
          <Card className="border shadow-lg dark:border-slate-800 dark:bg-slate-900/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>Latest system notifications</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-lg border transition-colors hover:bg-muted/50",
                      getAlertColor(alert.type),
                    )}
                  >
                    <div className="mt-0.5">
                      <alert.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <Badge variant="outline" className="text-xs">
                          {alert.room}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Rooms */}
          <Card className="border shadow-lg dark:border-slate-800 dark:bg-slate-900/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Top Performing Rooms</CardTitle>
                  <CardDescription>Highest efficiency ratings</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRooms.map((room, index) => (
                  <div
                    key={room.id}
                    className="flex items-center gap-4 p-3 transition-colors rounded-lg bg-muted/30 hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{room.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          {room.efficiency}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>
                          {room.occupancy}/{room.capacity} people
                        </span>
                        <span>{room.temperature}°C</span>
                      </div>
                      <Progress value={room.efficiency} className="h-1 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}

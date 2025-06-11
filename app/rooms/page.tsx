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
import RoomList from "@/components/rooms/room-list"
import RoomFiltersComponent from "@/components/rooms/room-filters"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Download } from "lucide-react"

export type RoomFiltersType = {
  building: string
  floor: string
  status: string
  search: string
}

export default function RoomsPage() {
  const [filters, setFilters] = useState<RoomFiltersType>({
    building: "",
    floor: "",
    status: "",
    search: "",
  })

  const updateFilter = (key: keyof RoomFiltersType, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      building: "",
      floor: "",
      status: "",
      search: "",
    })
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
                <BreadcrumbPage>Room Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-2 px-4 ml-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="w-64 pl-8"
            />
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Welcome Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Room Management
            </h1>
            <p className="text-muted-foreground">Monitor and control all connected rooms in your facility</p>
          </div>
        </div>

        {/* Filters Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">Filters & Controls</CardTitle>
            <CardDescription>Filter rooms by building, floor, status, or search by name</CardDescription>
          </CardHeader>
          <CardContent>
            <RoomFiltersComponent filters={filters} onFilterChange={updateFilter} onClearFilters={clearFilters} />
          </CardContent>
        </Card>

        {/* Room List Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">All Rooms</CardTitle>
            <CardDescription>Detailed view of all monitored rooms</CardDescription>
          </CardHeader>
          <CardContent>
            <RoomList filters={filters} />
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}

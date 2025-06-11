"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { RoomFiltersType } from "@/app/rooms/page"

interface RoomFiltersProps {
  filters: RoomFiltersType
  onFilterChange: (key: keyof RoomFiltersType, value: string) => void
  onClearFilters: () => void
}

export default function RoomFilters({ filters, onFilterChange, onClearFilters }: RoomFiltersProps) {
  const hasActiveFilters = filters.building || filters.floor || filters.status

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Select value={filters.building} onValueChange={(value) => onFilterChange("building", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Building" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Buildings</SelectItem>
            <SelectItem value="GKB">GKB Building</SelectItem>
            <SelectItem value="LAB">Laboratory Building</SelectItem>
            <SelectItem value="ADMIN">Administration Building</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.floor} onValueChange={(value) => onFilterChange("floor", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Floor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Floors</SelectItem>
            <SelectItem value="1">Floor 1</SelectItem>
            <SelectItem value="2">Floor 2</SelectItem>
            <SelectItem value="3">Floor 3</SelectItem>
            <SelectItem value="4">Floor 4</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.status} onValueChange={(value) => onFilterChange("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="idle">Idle</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={onClearFilters} disabled={!hasActiveFilters} className="w-full">
          Clear Filters
        </Button>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-slate-600">Active filters:</span>
          {filters.building && (
            <Badge
              variant="secondary"
              className="transition-colors cursor-pointer hover:bg-secondary/80"
              onClick={() => onFilterChange("building", "")}
            >
              Building: {filters.building}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          )}
          {filters.floor && (
            <Badge
              variant="secondary"
              className="transition-colors cursor-pointer hover:bg-secondary/80"
              onClick={() => onFilterChange("floor", "")}
            >
              Floor: {filters.floor}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          )}
          {filters.status && (
            <Badge
              variant="secondary"
              className="transition-colors cursor-pointer hover:bg-secondary/80"
              onClick={() => onFilterChange("status", "")}
            >
              Status: {filters.status}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

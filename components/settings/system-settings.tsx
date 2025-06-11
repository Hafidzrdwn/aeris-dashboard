"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function SystemSettings() {
  const [autoMode, setAutoMode] = useState(true)
  const [tempRange, setTempRange] = useState([20, 26])
  const [energySaving, setEnergySaving] = useState(true)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Temperature Control</CardTitle>
          <CardDescription>Global temperature settings for all rooms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="default-temp">Default Target Temperature</Label>
              <Input id="default-temp" type="number" defaultValue="23" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="temp-tolerance">Temperature Tolerance</Label>
              <Input id="temp-tolerance" type="number" defaultValue="0.5" step="0.1" className="mt-1" />
            </div>
          </div>

          <div>
            <Label>
              Allowed Temperature Range: {tempRange[0]}°C - {tempRange[1]}°C
            </Label>
            <Slider value={tempRange} onValueChange={setTempRange} max={30} min={16} step={1} className="mt-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI & Automation</CardTitle>
          <CardDescription>Configure intelligent system behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-mode">Enable AI Auto Mode</Label>
              <p className="text-sm text-slate-600">Let AI automatically adjust settings based on occupancy</p>
            </div>
            <Switch id="auto-mode" checked={autoMode} onCheckedChange={setAutoMode} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="energy-saving">Energy Saving Mode</Label>
              <p className="text-sm text-slate-600">Prioritize energy efficiency over comfort</p>
            </div>
            <Switch id="energy-saving" checked={energySaving} onCheckedChange={setEnergySaving} />
          </div>

          <div>
            <Label htmlFor="learning-rate">AI Learning Rate</Label>
            <Select defaultValue="medium">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">Slow (Conservative)</SelectItem>
                <SelectItem value="medium">Medium (Balanced)</SelectItem>
                <SelectItem value="fast">Fast (Aggressive)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Maintenance</CardTitle>
          <CardDescription>System maintenance and diagnostic tools</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline">Run System Diagnostics</Button>
            <Button variant="outline">Calibrate Sensors</Button>
            <Button variant="outline">Export System Logs</Button>
            <Button variant="outline">Reset to Factory Settings</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}

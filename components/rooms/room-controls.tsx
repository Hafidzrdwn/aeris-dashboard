"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Power, Thermometer, Wind, Settings } from "lucide-react"
import { getRoomById } from "@/lib/data"

interface RoomControlsProps {
  roomId: string
}

export default function RoomControls({ roomId }: RoomControlsProps) {
  const room = getRoomById(roomId)
  const [targetTemp, setTargetTemp] = useState(room?.targetTemperature || 23)
  const [autoMode, setAutoMode] = useState(room?.acStatus === "auto")
  const [acPower, setAcPower] = useState(room?.acStatus !== "off")

  if (!room) {
    return <div>Room not found</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Power className="w-5 h-5" />
            <span>Power Control</span>
          </CardTitle>
          <CardDescription>Turn AC system on/off</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch id="ac-power" checked={acPower} onCheckedChange={setAcPower} />
            <Label htmlFor="ac-power">AC System {acPower ? "On" : "Off"}</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Thermometer className="w-5 h-5" />
            <span>Temperature Control</span>
          </CardTitle>
          <CardDescription>Set target temperature</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Target Temperature: {targetTemp}°C</Label>
            <Slider
              value={[targetTemp]}
              onValueChange={(value) => setTargetTemp(value[0])}
              max={30}
              min={16}
              step={0.5}
              className="mt-2"
              disabled={!acPower}
            />
            <div className="flex justify-between text-sm text-slate-500 mt-1">
              <span>16°C</span>
              <span>30°C</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Operation Mode</span>
          </CardTitle>
          <CardDescription>Configure AC operation mode</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="auto-mode" checked={autoMode} onCheckedChange={setAutoMode} disabled={!acPower} />
            <Label htmlFor="auto-mode">Automatic Mode (AI-controlled)</Label>
          </div>

          {!autoMode && acPower && (
            <div>
              <Label>Fan Speed</Label>
              <Select defaultValue="medium">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wind className="w-5 h-5" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>Common temperature presets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => setTargetTemp(20)} disabled={!acPower}>
              Cool (20°C)
            </Button>
            <Button variant="outline" onClick={() => setTargetTemp(23)} disabled={!acPower}>
              Comfort (23°C)
            </Button>
            <Button variant="outline" onClick={() => setTargetTemp(26)} disabled={!acPower}>
              Warm (26°C)
            </Button>
            <Button variant="outline" onClick={() => setTargetTemp(18)} disabled={!acPower}>
              Cold (18°C)
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-2">
        <Button className="flex-1">Apply Changes</Button>
        <Button variant="outline" className="flex-1">
          Reset to Default
        </Button>
      </div>
    </div>
  )
}

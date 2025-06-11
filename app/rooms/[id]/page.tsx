import { Suspense } from "react"
import RoomDetails from "@/components/rooms/room-details"
import RoomControls from "@/components/rooms/room-controls"
import RoomChart from "@/components/rooms/room-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface RoomPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function RoomPage({ params }: RoomPageProps) {
  // Await the params before using them
  const resolvedParams = await params
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <Link href="/rooms">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Rooms
            </Button>
          </Link>
          <h1 className="mb-2 text-4xl font-bold text-slate-800">Room {resolvedParams.id}</h1>
          <p className="text-lg text-slate-600">Detailed monitoring and control</p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Room Status</CardTitle>
                <CardDescription>Current conditions and sensor readings</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading details...</div>}>
                  <RoomDetails roomId={resolvedParams.id} />
                </Suspense>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Temperature & Occupancy Trends</CardTitle>
                <CardDescription>Last 24 hours data</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading chart...</div>}>
                  <RoomChart roomId={resolvedParams.id} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Room Controls</CardTitle>
                <CardDescription>Adjust settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading controls...</div>}>
                  <RoomControls roomId={resolvedParams.id} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
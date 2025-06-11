import { Suspense } from "react"
import EnergyAnalytics from "@/components/analytics/energy-analytics"
import EfficiencyMetrics from "@/components/analytics/efficiency-metrics"
import UsagePatterns from "@/components/analytics/usage-patterns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Analytics & Insights</h1>
          <p className="text-slate-600 text-lg">Energy efficiency and usage analytics</p>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">Energy Consumption Analytics</CardTitle>
              <CardDescription>Detailed energy usage patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading analytics...</div>}>
                <EnergyAnalytics />
              </Suspense>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Efficiency Metrics</CardTitle>
                <CardDescription>Performance indicators and savings</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading metrics...</div>}>
                  <EfficiencyMetrics />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Usage Patterns</CardTitle>
                <CardDescription>Room utilization and occupancy trends</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading patterns...</div>}>
                  <UsagePatterns />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

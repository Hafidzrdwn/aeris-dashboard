import { Suspense } from "react"
import SystemSettings from "@/components/settings/system-settings"
import NotificationSettings from "@/components/settings/notification-settings"
import UserManagement from "@/components/settings/user-management"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">System Settings</h1>
          <p className="text-slate-600 text-lg">Configure AERIS system preferences</p>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">System Configuration</CardTitle>
              <CardDescription>Global system settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading settings...</div>}>
                <SystemSettings />
              </Suspense>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Notifications</CardTitle>
                <CardDescription>Alert and notification preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading notifications...</div>}>
                  <NotificationSettings />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">User Management</CardTitle>
                <CardDescription>Manage system users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading users...</div>}>
                  <UserManagement />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal, Plus, Shield, User, Settings } from "lucide-react"

const users = [
  {
    id: 1,
    name: "Dr. Ahmad Susanto",
    email: "ahmad.susanto@upnjatim.ac.id",
    role: "Administrator",
    status: "Active",
    lastLogin: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@upnjatim.ac.id",
    role: "Operator",
    status: "Active",
    lastLogin: "2024-01-15T09:15:00Z",
  },
  {
    id: 3,
    name: "Budi Santoso",
    email: "budi.santoso@upnjatim.ac.id",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "2024-01-10T14:20:00Z",
  },
]

const getRoleIcon = (role: string) => {
  switch (role) {
    case "Administrator":
      return Shield
    case "Operator":
      return Settings
    case "Viewer":
      return User
    default:
      return User
  }
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "Administrator":
      return "bg-red-100 text-red-800"
    case "Operator":
      return "bg-blue-100 text-blue-800"
    case "Viewer":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800"
    case "Inactive":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function UserManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h3 className="text-lg font-semibold">System Users</h3>
          <p className="text-sm text-slate-600">Manage user access and permissions</p>
        </div>
        <Button className="w-fit">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="space-y-4">
        {users.map((user) => {
          const RoleIcon = getRoleIcon(user.role)
          return (
            <Card key={user.id}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center flex-1 min-w-0 space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="text-sm font-medium text-white bg-gradient-to-br from-blue-500 to-purple-600">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{user.name}</h4>
                      <p className="text-sm truncate text-slate-600">{user.email}</p>
                      <p className="text-xs text-slate-500">
                        Last login: {new Date(user.lastLogin).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 lg:gap-4">
                    <div className="flex items-center space-x-2">
                      <RoleIcon className="flex-shrink-0 w-4 h-4" />
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    </div>

                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>

                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Configure what each role can access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1">
            <div className="relative p-6 border border-red-200 rounded-xl bg-gradient-to-br from-red-50 to-red-100/50">
              <div className="flex items-center mb-4 space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-red-900">Administrator</h4>
                  <p className="text-xs text-red-600">Full Access</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-red-800">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span>Full system access</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span>User management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span>System configuration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span>All room controls</span>
                </li>
              </ul>
            </div>

            <div className="relative p-6 border border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50">
              <div className="flex items-center mb-4 space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Operator</h4>
                  <p className="text-xs text-blue-600">Operational Access</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Room monitoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Temperature control</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Basic settings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Alert management</span>
                </li>
              </ul>
            </div>

            <div className="relative p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50">
              <div className="flex items-center mb-4 space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Viewer</h4>
                  <p className="text-xs text-gray-600">Read-only Access</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-800">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                  <span>View dashboards</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                  <span>Read-only access</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                  <span>No control permissions</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
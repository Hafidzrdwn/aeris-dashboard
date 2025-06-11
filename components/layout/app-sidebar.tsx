"use client"

import type * as React from "react"
import { Home, Building2, BarChart3, Settings, Thermometer, Zap, Bell, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/layout/theme-toggle"

const navigation = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    badge: null,
  },
  {
    title: "Rooms",
    url: "/rooms",
    icon: Building2,
    badge: "24",
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    badge: null,
  },
]

const quickStats = [
  {
    label: "Active Rooms",
    value: "24",
    icon: Building2,
    color: "text-blue-500",
  },
  {
    label: "Avg Temp",
    value: "22.5°C",
    icon: Thermometer,
    color: "text-green-500",
  },
  {
    label: "Energy Saved",
    value: "32%",
    icon: Zap,
    color: "text-orange-500",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex items-center justify-center w-10 h-10 text-white shadow-lg rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
            <Thermometer className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              AERIS
            </span>
            <span className="text-xs text-muted-foreground">Smart Cooling System</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "group relative overflow-hidden transition-all duration-200",
                        isActive && "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-r-2 border-blue-500",
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon
                          className={cn(
                            "h-4 w-4 transition-colors",
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                        />
                        <span
                          className={cn(
                            "font-medium transition-colors",
                            isActive ? "text-blue-600 dark:text-blue-400" : "text-foreground",
                          )}
                        >
                          {item.title}
                        </span>
                        {item.badge && (
                          <Badge variant="secondary" className="w-5 h-5 p-0 ml-auto text-xs rounded-full">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            Quick Stats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-2">
              {quickStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="text-sm font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs text-white bg-gradient-to-br from-blue-500 to-purple-600">
                HR
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Hafidz Ridwan</p>
              <p className="text-xs truncate text-muted-foreground">Administrator</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <LogOut className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Sign out</span>
            </Button>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

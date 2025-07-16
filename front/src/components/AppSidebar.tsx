import { useState } from "react";
import { Home, BarChart3, Users, Settings, MessageSquare, Calendar, Target, TrendingUp } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Home,
    exact: true 
  },
  { 
    title: "Analytics", 
    url: "/analytics", 
    icon: BarChart3 
  },
  { 
    title: "Campaigns", 
    url: "/campaigns", 
    icon: Target 
  },
  { 
    title: "Team", 
    url: "/team", 
    icon: Users 
  },
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings 
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-sm"></div>
              </div>
            </div>
            {!collapsed && (
              <div className="text-sidebar-foreground">
                <div className="font-medium text-base">InfyCampaign</div>
                <div className="text-xs text-sidebar-foreground/60">Analytics</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.url, item.exact);
            
            return (
              <NavLink
                key={item.title}
                to={item.url}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-200 group text-base",
                  active 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  active ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                )} />
                {!collapsed && (
                  <span className="font-normal">{item.title}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center text-xs font-medium text-primary">
                U
              </div>
            </div>
            {!collapsed && (
              <div className="text-sidebar-foreground">
                <div className="font-normal text-sm">User Name</div>
                <div className="text-xs text-sidebar-foreground/60">user@example.com</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
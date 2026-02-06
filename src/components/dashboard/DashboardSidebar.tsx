import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Home,
  FolderOpen,
  BarChart3,
  Award,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "workspace", label: "Workspace", icon: FolderOpen },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "badges", label: "Badges", icon: Award },
  { id: "settings", label: "Settings", icon: Settings },
];

const DashboardSidebar = ({ activeTab, onTabChange }: DashboardSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-sm">
              <span className="text-gradient">Edugram</span>
              <span className="text-muted-foreground"> AI</span>
            </span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <Link to="/">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 ${collapsed ? "px-2" : ""}`}
          >
            <Home className="h-4 w-4" />
            {!collapsed && <span>Home</span>}
          </Button>
        </Link>

        <div className="py-2">
          <div className={`h-px bg-sidebar-border ${collapsed ? "mx-1" : "mx-2"}`} />
        </div>

        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className={`w-full justify-start gap-3 ${collapsed ? "px-2" : ""} ${
              activeTab === item.id ? "bg-sidebar-accent" : ""
            }`}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="h-4 w-4" />
            {!collapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-sidebar-border">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Alex Johnson</p>
              <p className="text-xs text-muted-foreground truncate">Student</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <Button variant="ghost" size="sm" className="w-full mt-2 gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;

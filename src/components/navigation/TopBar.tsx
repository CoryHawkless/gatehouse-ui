import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, ChevronDown, LogOut, User, Shield, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock user data - will be replaced with real auth context
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: null,
  initials: "JD",
};

// Mock organization data
const mockOrgs = [
  { id: "1", name: "Acme Corp", role: "admin" },
  { id: "2", name: "Beta Inc", role: "member" },
];

export function TopBar() {
  const navigate = useNavigate();
  const [currentOrg, setCurrentOrg] = useState(mockOrgs[0]);

  const handleLogout = () => {
    // Will be replaced with actual logout logic
    navigate("/login");
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 flex-shrink-0">
      {/* Left side - Sidebar toggle */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground">
          <Menu className="w-5 h-5" />
        </SidebarTrigger>
      </div>

      {/* Right side - Org selector + User menu */}
      <div className="flex items-center gap-3">
        {/* Organization Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-9 px-3">
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                <Building2 className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm font-medium hidden sm:inline">{currentOrg.name}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
              Switch Organization
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockOrgs.map((org) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => setCurrentOrg(org)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span>{org.name}</span>
                </div>
                {org.role === "admin" && (
                  <span className="text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
              <Avatar className="w-7 h-7">
                <AvatarImage src={mockUser.avatar || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {mockUser.initials}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{mockUser.name}</span>
                <span className="text-xs text-muted-foreground font-normal">
                  {mockUser.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/security")}>
              <Shield className="w-4 h-4 mr-2" />
              Security
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

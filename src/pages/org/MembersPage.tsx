import { useState } from "react";
import { Search, Plus, MoreHorizontal, Shield, User, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const members = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    lastActive: "2 hours ago",
    avatar: null,
    initials: "JD",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "member",
    status: "active",
    lastActive: "5 minutes ago",
    avatar: null,
    initials: "JS",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "member",
    status: "disabled",
    lastActive: "3 days ago",
    avatar: null,
    initials: "BW",
  },
];

const pendingInvites = [
  {
    id: "1",
    email: "alice@example.com",
    role: "member",
    sentAt: "2 days ago",
    expiresAt: "5 days",
  },
  {
    id: "2",
    email: "charlie@example.com",
    role: "admin",
    sentAt: "1 hour ago",
    expiresAt: "7 days",
  },
];

export default function MembersPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="page-container">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Members</h1>
          <p className="page-description">
            Manage organization members and invitations
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Invite member
        </Button>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="members">
            Members ({members.length})
          </TabsTrigger>
          <TabsTrigger value="invites">
            Pending Invites ({pendingInvites.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 max-w-sm"
              />
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {members.map((member) => (
                  <div key={member.id} className="p-4 flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground truncate">
                          {member.name}
                        </p>
                        {member.role === "admin" && (
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            Admin
                          </Badge>
                        )}
                        {member.status === "disabled" && (
                          <Badge variant="destructive" className="text-xs">
                            Disabled
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {member.email}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground hidden sm:block">
                      Active {member.lastActive}
                    </p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <User className="w-4 h-4 mr-2" />
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="w-4 h-4 mr-2" />
                          Change role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          {member.status === "active" ? "Disable" : "Enable"} account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invites">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {pendingInvites.map((invite) => (
                  <div key={invite.id} className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {invite.email}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Invited as {invite.role}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Expires in {invite.expiresAt}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Resend
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Revoke
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

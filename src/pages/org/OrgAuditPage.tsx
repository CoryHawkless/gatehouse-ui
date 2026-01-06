import { useState } from "react";
import { Search, Filter, Download, User, Settings, Key, UserPlus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const auditEvents = [
  {
    id: "1",
    type: "member_invited",
    actor: "John Doe",
    target: "alice@example.com",
    timestamp: "2024-01-15T10:30:00Z",
    details: "Invited as member",
  },
  {
    id: "2",
    type: "policy_changed",
    actor: "John Doe",
    target: "Password Policy",
    timestamp: "2024-01-15T09:00:00Z",
    details: "Minimum length changed from 8 to 12",
  },
  {
    id: "3",
    type: "member_disabled",
    actor: "Jane Smith",
    target: "bob@example.com",
    timestamp: "2024-01-14T15:45:00Z",
    details: "Account disabled",
  },
  {
    id: "4",
    type: "client_created",
    actor: "John Doe",
    target: "GitLab",
    timestamp: "2024-01-14T12:00:00Z",
    details: "OIDC client created",
  },
  {
    id: "5",
    type: "role_changed",
    actor: "John Doe",
    target: "jane@example.com",
    timestamp: "2024-01-13T09:00:00Z",
    details: "Role changed from member to admin",
  },
];

const getEventIcon = (type: string) => {
  switch (type) {
    case "member_invited":
    case "role_changed":
      return <UserPlus className="w-4 h-4" />;
    case "policy_changed":
      return <Settings className="w-4 h-4" />;
    case "member_disabled":
      return <AlertTriangle className="w-4 h-4" />;
    case "client_created":
      return <Key className="w-4 h-4" />;
    default:
      return <User className="w-4 h-4" />;
  }
};

const getEventTitle = (type: string) => {
  switch (type) {
    case "member_invited":
      return "Member invited";
    case "policy_changed":
      return "Policy changed";
    case "member_disabled":
      return "Member disabled";
    case "client_created":
      return "OIDC client created";
    case "role_changed":
      return "Role changed";
    default:
      return "Event";
  }
};

export default function OrgAuditPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="page-container">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Audit Log</h1>
          <p className="page-description">
            View all administrative actions and changes
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All events</SelectItem>
            <SelectItem value="members">Member changes</SelectItem>
            <SelectItem value="policies">Policy changes</SelectItem>
            <SelectItem value="clients">OIDC clients</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {auditEvents.map((event) => (
              <div key={event.id} className="p-4 flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    event.type === "member_disabled"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-foreground">
                      {getEventTitle(event.type)}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {event.target}
                    </Badge>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <span>by {event.actor}</span>
                    <span className="mx-2">•</span>
                    <span>{event.details}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground whitespace-nowrap">
                  {formatDate(event.timestamp)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

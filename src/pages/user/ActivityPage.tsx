import { useState } from "react";
import { LogIn, LogOut, Key, Fingerprint, Smartphone, AlertTriangle, CheckCircle, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const activityEvents = [
  {
    id: "1",
    type: "login_success",
    method: "password",
    timestamp: "2024-01-15T10:30:00Z",
    location: "San Francisco, CA",
    device: "Chrome on macOS",
    ip: "192.168.1.1",
  },
  {
    id: "2",
    type: "login_success",
    method: "passkey",
    timestamp: "2024-01-14T15:45:00Z",
    location: "San Francisco, CA",
    device: "Safari on iOS",
    ip: "192.168.1.2",
  },
  {
    id: "3",
    type: "login_failed",
    method: "password",
    timestamp: "2024-01-14T12:00:00Z",
    location: "Unknown",
    device: "Firefox on Windows",
    ip: "10.0.0.5",
  },
  {
    id: "4",
    type: "mfa_enabled",
    method: "totp",
    timestamp: "2024-01-13T09:00:00Z",
    location: "San Francisco, CA",
    device: "Chrome on macOS",
    ip: "192.168.1.1",
  },
  {
    id: "5",
    type: "passkey_added",
    method: "passkey",
    timestamp: "2024-01-12T14:30:00Z",
    location: "San Francisco, CA",
    device: "Safari on macOS",
    ip: "192.168.1.1",
  },
];

const getEventIcon = (type: string, method: string) => {
  switch (type) {
    case "login_success":
      return method === "passkey" ? (
        <Fingerprint className="w-4 h-4" />
      ) : (
        <LogIn className="w-4 h-4" />
      );
    case "login_failed":
      return <AlertTriangle className="w-4 h-4" />;
    case "mfa_enabled":
      return <Smartphone className="w-4 h-4" />;
    case "passkey_added":
      return <Fingerprint className="w-4 h-4" />;
    case "logout":
      return <LogOut className="w-4 h-4" />;
    default:
      return <Key className="w-4 h-4" />;
  }
};

const getEventTitle = (type: string, method: string) => {
  switch (type) {
    case "login_success":
      return `Signed in with ${method}`;
    case "login_failed":
      return "Failed login attempt";
    case "mfa_enabled":
      return "Two-factor authentication enabled";
    case "passkey_added":
      return "Passkey added";
    case "logout":
      return "Signed out";
    default:
      return "Security event";
  }
};

const getEventStatus = (type: string) => {
  if (type === "login_failed") {
    return { variant: "destructive" as const, label: "Failed" };
  }
  return { variant: "default" as const, label: "Success" };
};

export default function ActivityPage() {
  const [filter, setFilter] = useState("all");

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
          <h1 className="page-title">Activity</h1>
          <p className="page-description">
            Your recent account activity and security events
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All events</SelectItem>
            <SelectItem value="logins">Logins only</SelectItem>
            <SelectItem value="security">Security changes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {activityEvents.map((event) => {
              const status = getEventStatus(event.type);
              return (
                <div key={event.id} className="p-4 flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      event.type === "login_failed"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {getEventIcon(event.type, event.method)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-foreground">
                        {getEventTitle(event.type, event.method)}
                      </p>
                      {event.type === "login_failed" && (
                        <Badge variant="destructive" className="text-xs">
                          Failed
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground space-y-0.5">
                      <p>{event.device}</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="font-mono text-xs">{event.ip}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(event.timestamp)}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

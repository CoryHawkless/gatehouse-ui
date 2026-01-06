import { useState } from "react";
import { Plus, Key, ExternalLink, MoreHorizontal, Copy, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const clients = [
  {
    id: "1",
    name: "GitLab",
    clientId: "gitlab_prod_xxxxxxxxxxxxx",
    redirectUris: ["https://gitlab.example.com/callback"],
    scopes: ["openid", "profile", "email"],
    createdAt: "2024-01-10",
    lastUsed: "2 hours ago",
  },
  {
    id: "2",
    name: "Grafana",
    clientId: "grafana_prod_xxxxxxxxxxxxx",
    redirectUris: ["https://grafana.example.com/login/generic_oauth"],
    scopes: ["openid", "profile"],
    createdAt: "2024-01-08",
    lastUsed: "5 minutes ago",
  },
  {
    id: "3",
    name: "OAuth2 Proxy",
    clientId: "oauth2proxy_xxxxxxxxxxxxx",
    redirectUris: ["https://auth.example.com/oauth2/callback"],
    scopes: ["openid", "profile", "email", "groups"],
    createdAt: "2024-01-05",
    lastUsed: "1 day ago",
  },
];

export default function OIDCClientsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="page-container">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">OIDC Clients</h1>
          <p className="page-description">
            Manage applications that authenticate via Gatehouse
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create OIDC Client</DialogTitle>
              <DialogDescription>
                Register a new application to authenticate via Gatehouse
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client name</Label>
                <Input id="clientName" placeholder="My Application" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="redirectUris">Redirect URIs</Label>
                <Textarea
                  id="redirectUris"
                  placeholder="https://myapp.example.com/callback"
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  One URI per line. These are the allowed callback URLs.
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateOpen(false)}>
                  Create client
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Key className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{client.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                        {client.clientId}
                      </code>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {client.scopes.map((scope) => (
                        <Badge key={scope} variant="secondary" className="text-xs">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Rotate secret
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>Created {client.createdAt}</span>
                  <span>•</span>
                  <span>Last used {client.lastUsed}</span>
                </div>
                <div className="flex items-center gap-1">
                  {client.redirectUris.length} redirect URI{client.redirectUris.length > 1 ? "s" : ""}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

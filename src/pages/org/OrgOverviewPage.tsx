import { Building2, Users, Shield, Key, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrgOverviewPage() {
  // Mock organization data
  const org = {
    name: "Acme Corp",
    createdAt: "January 2024",
    stats: {
      totalMembers: 24,
      activeToday: 18,
      pendingInvites: 3,
      oidcClients: 5,
    },
  };

  const quickLinks = [
    {
      title: "Members",
      description: "Manage team members and roles",
      icon: Users,
      href: "/org/members",
    },
    {
      title: "Policies",
      description: "Configure security requirements",
      icon: Shield,
      href: "/org/policies",
    },
    {
      title: "OIDC Clients",
      description: "Manage connected applications",
      icon: Key,
      href: "/org/clients",
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="page-title">{org.name}</h1>
            <p className="page-description">Created {org.createdAt}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-2xl font-semibold">{org.stats.totalMembers}</p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Today</p>
                <p className="text-2xl font-semibold">{org.stats.activeToday}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Invites</p>
                <p className="text-2xl font-semibold">{org.stats.pendingInvites}</p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">OIDC Clients</p>
                <p className="text-2xl font-semibold">{org.stats.oidcClients}</p>
              </div>
              <Key className="w-8 h-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((link) => (
          <Link key={link.href} to={link.href}>
            <Card className="h-full hover:border-accent/50 transition-colors cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <link.icon className="w-5 h-5 text-accent" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-medium text-foreground">{link.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

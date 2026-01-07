import { useState, useEffect } from "react";
import { Mail, Building2, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { api, Organization, ApiError } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [orgsLoading, setOrgsLoading] = useState(true);

  // Sync local name state with user data
  useEffect(() => {
    if (user?.full_name) {
      setName(user.full_name);
    }
  }, [user?.full_name]);

  // Fetch organizations only when user is available
  useEffect(() => {
    if (!user) {
      setOrgsLoading(false);
      return;
    }

    const fetchOrgs = async () => {
      try {
        const response = await api.users.organizations();
        setOrganizations(response.organizations);
      } catch (error) {
        if (error instanceof ApiError) {
          toast({
            title: "Error loading organizations",
            description: error.message,
            variant: "destructive",
          });
        }
      } finally {
        setOrgsLoading(false);
      }
    };

    fetchOrgs();
  }, [user]);

  const getInitials = (fullName: string | null) => {
    if (!fullName) return "?";
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await api.users.updateMe({ full_name: name.trim() });
      await refreshUser();
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your name has been updated successfully",
      });
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.full_name || "");
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="page-container flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-description">
          Manage your personal information and organization memberships
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Photo & Name */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
            <CardDescription>Update your photo and personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar_url || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {getInitials(user.full_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Change photo
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              {isEditing ? (
                <div className="flex gap-2">
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSaving}
                  />
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/30">
                  <span className="text-foreground">{user.full_name || "Not set"}</span>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Email */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Email Address</CardTitle>
            <CardDescription>Your email is used for login and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{user.email}</span>
                {user.email_verified ? (
                  <Badge variant="secondary" className="bg-success/10 text-success border-0">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-warning/10 text-warning border-0">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Unverified
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Organizations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Organizations</CardTitle>
            <CardDescription>Organizations you're a member of</CardDescription>
          </CardHeader>
          <CardContent>
            {orgsLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            ) : organizations.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                You're not a member of any organizations yet.
              </p>
            ) : (
              <div className="space-y-2">
                {organizations.map((org) => (
                  <div
                    key={org.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {org.logo_url ? (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={org.logo_url} />
                          <AvatarFallback>
                            <Building2 className="w-4 h-4 text-primary" />
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <span className="text-foreground font-medium">{org.name}</span>
                    </div>
                    <Badge variant="secondary" className="capitalize">{org.role}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

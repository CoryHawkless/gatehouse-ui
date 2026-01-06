import { useState } from "react";
import { Lock, Fingerprint, Smartphone, Shield, Plus, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function SecurityPage() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Mock security data
  const security = {
    passwordLastChanged: "3 months ago",
    totpEnabled: true,
    passkeysCount: 2,
    passkeys: [
      { id: "1", name: "MacBook Pro Touch ID", lastUsed: "Today" },
      { id: "2", name: "iPhone Face ID", lastUsed: "Yesterday" },
    ],
    policyRequirements: {
      totpRequired: true,
      passkeysRequired: false,
      minPasswordLength: 12,
    },
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Security</h1>
        <p className="page-description">
          Manage your authentication methods and security settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Policy Status */}
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Organization Policy</p>
                <p className="text-sm text-muted-foreground">
                  Your organization requires TOTP to be enabled for all members.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </CardTitle>
                <CardDescription>Last changed {security.passwordLastChanged}</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                Change password
              </Button>
            </div>
          </CardHeader>
          {showPasswordForm && (
            <CardContent className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <Input id="newPassword" type="password" />
                <p className="text-xs text-muted-foreground">
                  Minimum {security.policyRequirements.minPasswordLength} characters required by organization
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <div className="flex gap-2">
                <Button>Update password</Button>
                <Button variant="outline" onClick={() => setShowPasswordForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* TOTP / Authenticator */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Authenticator App (TOTP)
                  {security.policyRequirements.totpRequired && (
                    <Badge variant="secondary" className="ml-2 text-xs">Required</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Use an authenticator app for two-factor authentication
                </CardDescription>
              </div>
              {security.totpEnabled ? (
                <Badge className="bg-success/10 text-success border-0">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Enabled
                </Badge>
              ) : (
                <Button size="sm">Set up</Button>
              )}
            </div>
          </CardHeader>
          {security.totpEnabled && (
            <CardContent className="border-t pt-4">
              <Button variant="outline" size="sm">
                Reconfigure
              </Button>
            </CardContent>
          )}
        </Card>

        {/* Passkeys */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Fingerprint className="w-4 h-4" />
                  Passkeys
                  {security.policyRequirements.passkeysRequired && (
                    <Badge variant="secondary" className="ml-2 text-xs">Required</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Use biometrics or security keys for passwordless login
                </CardDescription>
              </div>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add passkey
              </Button>
            </div>
          </CardHeader>
          <CardContent className="border-t pt-4">
            <div className="space-y-3">
              {security.passkeys.map((passkey) => (
                <div
                  key={passkey.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                      <Fingerprint className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{passkey.name}</p>
                      <p className="text-xs text-muted-foreground">Last used: {passkey.lastUsed}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

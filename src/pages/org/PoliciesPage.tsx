import { Shield, Lock, Fingerprint, Smartphone, UserPlus, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PoliciesPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Security Policies</h1>
        <p className="page-description">
          Configure security requirements for organization members
        </p>
      </div>

      <div className="space-y-6">
        {/* Registration Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Registration Mode
            </CardTitle>
            <CardDescription>
              Control how new members can join your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select defaultValue="invite">
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open registration</SelectItem>
                <SelectItem value="invite">Invite only</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-2">
              Invite only: Members can only join via admin invitation
            </p>
          </CardContent>
        </Card>

        {/* Password Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password Policy
            </CardTitle>
            <CardDescription>
              Set minimum password requirements for all members
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Minimum password length</Label>
              <div className="flex items-center gap-4">
                <Slider
                  defaultValue={[12]}
                  max={32}
                  min={8}
                  step={1}
                  className="w-full max-w-xs"
                />
                <span className="text-sm font-medium w-16">12 chars</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require uppercase letters</Label>
                  <p className="text-sm text-muted-foreground">At least one A-Z</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Require numbers</Label>
                  <p className="text-sm text-muted-foreground">At least one 0-9</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Require special characters</Label>
                  <p className="text-sm text-muted-foreground">At least one !@#$%^&*</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MFA Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Multi-Factor Authentication
            </CardTitle>
            <CardDescription>
              Require additional authentication methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="flex items-center gap-2">
                  Require TOTP
                  <Badge variant="secondary" className="text-xs">Recommended</Badge>
                </Label>
                <p className="text-sm text-muted-foreground">
                  All members must set up an authenticator app
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Alert className="border-warning/30 bg-warning/5">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <AlertDescription className="text-sm">
                Enabling this will require all existing members to set up TOTP on their next login.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Passkey Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Fingerprint className="w-4 h-4" />
              Passkeys (WebAuthn)
            </CardTitle>
            <CardDescription>
              Require passwordless authentication capability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>Require at least one passkey</Label>
                <p className="text-sm text-muted-foreground">
                  Members must register a passkey for backup authentication
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

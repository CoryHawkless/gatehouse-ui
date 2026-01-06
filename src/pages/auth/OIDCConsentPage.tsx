import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Shield, User, Mail, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function OIDCConsentPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Mock OIDC client data - will be fetched from auth flow
  const clientData = {
    name: "GitLab",
    logo: null,
    redirectUri: "https://gitlab.example.com/callback",
    scopes: [
      { id: "openid", name: "OpenID", description: "Verify your identity" },
      { id: "profile", name: "Profile", description: "Access your name and profile picture" },
      { id: "email", name: "Email", description: "Access your email address" },
    ],
  };

  const handleAllow = () => {
    setIsLoading(true);
    // Mock consent - will redirect to client callback
    setTimeout(() => {
      setIsLoading(false);
      // In real implementation: redirect to redirectUri with auth code
    }, 500);
  };

  const handleDeny = () => {
    navigate(-1);
  };

  return (
    <div className="auth-card">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Shield className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">
          Authorize {clientData.name}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          This application wants to access your account
        </p>
      </div>

      <Card className="p-4 bg-secondary/30 border-0 mb-6">
        <p className="text-sm text-foreground font-medium mb-3">
          {clientData.name} is requesting access to:
        </p>
        <ul className="space-y-3">
          {clientData.scopes.map((scope) => (
            <li key={scope.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center flex-shrink-0">
                {scope.id === "openid" && <Shield className="w-4 h-4 text-accent" />}
                {scope.id === "profile" && <User className="w-4 h-4 text-accent" />}
                {scope.id === "email" && <Mail className="w-4 h-4 text-accent" />}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{scope.name}</p>
                <p className="text-xs text-muted-foreground">{scope.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <Building2 className="w-4 h-4" />
        <span>
          Redirecting to: <span className="font-mono text-foreground">{clientData.redirectUri}</span>
        </span>
      </div>

      <Separator className="mb-6" />

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleDeny}
          className="flex-1"
          disabled={isLoading}
        >
          <XCircle className="w-4 h-4 mr-2" />
          Deny
        </Button>
        <Button
          onClick={handleAllow}
          className="flex-1"
          disabled={isLoading}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          {isLoading ? "Authorizing..." : "Allow"}
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">
        You can revoke this access anytime from your{" "}
        <a href="/linked-accounts" className="text-accent hover:underline">
          linked accounts
        </a>
      </p>
    </div>
  );
}

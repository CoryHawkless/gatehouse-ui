import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function OIDCErrorPage() {
  // Mock error data - will be parsed from URL params
  const errorData = {
    error: "invalid_request",
    description: "The request was missing a required parameter or was otherwise malformed.",
    clientName: "Unknown Application",
  };

  return (
    <div className="auth-card text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>

      <h1 className="text-2xl font-semibold text-foreground tracking-tight">
        Authentication Error
      </h1>
      <p className="text-muted-foreground mt-2 mb-4">
        There was a problem with the authentication request.
      </p>

      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-6 text-left">
        <p className="text-sm font-medium text-foreground mb-1">
          Error: <code className="text-destructive">{errorData.error}</code>
        </p>
        <p className="text-sm text-muted-foreground">
          {errorData.description}
        </p>
      </div>

      <div className="space-y-3">
        <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go back
        </Button>
        <Link to="/">
          <Button variant="ghost" className="w-full">
            <Home className="w-4 h-4 mr-2" />
            Return to home
          </Button>
        </Link>
      </div>
    </div>
  );
}

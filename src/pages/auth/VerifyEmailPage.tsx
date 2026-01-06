import { Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function VerifyEmailPage() {
  return (
    <div className="auth-card text-center">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
        <Mail className="w-8 h-8 text-accent" />
      </div>

      <h1 className="text-2xl font-semibold text-foreground tracking-tight">
        Check your email
      </h1>
      <p className="text-muted-foreground mt-2 mb-6">
        We've sent a verification link to your email address. Click the link to verify your account.
      </p>

      <div className="space-y-3">
        <Button variant="outline" className="w-full">
          <RefreshCw className="w-4 h-4 mr-2" />
          Resend verification email
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mt-6">
        Wrong email?{" "}
        <Link to="/register" className="text-accent hover:underline font-medium">
          Go back
        </Link>
      </p>
    </div>
  );
}

import { Shield } from "lucide-react";
import { Outlet, Link } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-secondary/30 pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 w-full py-6 px-4">
        <div className="max-w-md mx-auto">
          <Link to="/" className="flex items-center gap-2 justify-center">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground tracking-tight">Authy2</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md animate-fade-in">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-4">
        <div className="max-w-md mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Authy2. Secure identity management.
          </p>
        </div>
      </footer>
    </div>
  );
}

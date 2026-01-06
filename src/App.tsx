import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "@/components/layouts/PublicLayout";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";

// Public pages
import Index from "@/pages/Index";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import InviteAcceptPage from "@/pages/auth/InviteAcceptPage";
import OIDCConsentPage from "@/pages/auth/OIDCConsentPage";
import OIDCErrorPage from "@/pages/auth/OIDCErrorPage";

// User pages
import ProfilePage from "@/pages/user/ProfilePage";
import SecurityPage from "@/pages/user/SecurityPage";
import LinkedAccountsPage from "@/pages/user/LinkedAccountsPage";
import ActivityPage from "@/pages/user/ActivityPage";

// Organization pages
import OrgOverviewPage from "@/pages/org/OrgOverviewPage";
import MembersPage from "@/pages/org/MembersPage";
import PoliciesPage from "@/pages/org/PoliciesPage";
import OrgAuditPage from "@/pages/org/OrgAuditPage";
import OIDCClientsPage from "@/pages/org/OIDCClientsPage";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Index redirect */}
          <Route path="/" element={<Index />} />

          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/invite" element={<InviteAcceptPage />} />
            <Route path="/consent" element={<OIDCConsentPage />} />
            <Route path="/error" element={<OIDCErrorPage />} />
          </Route>

          {/* Authenticated routes */}
          <Route element={<AuthenticatedLayout />}>
            {/* User routes */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/linked-accounts" element={<LinkedAccountsPage />} />
            <Route path="/activity" element={<ActivityPage />} />

            {/* Organization routes */}
            <Route path="/org" element={<OrgOverviewPage />} />
            <Route path="/org/members" element={<MembersPage />} />
            <Route path="/org/policies" element={<PoliciesPage />} />
            <Route path="/org/audit" element={<OrgAuditPage />} />
            <Route path="/org/clients" element={<OIDCClientsPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

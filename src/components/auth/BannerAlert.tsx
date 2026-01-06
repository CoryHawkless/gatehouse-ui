import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerAlertProps {
  type: "info" | "success" | "warning" | "error";
  title?: string;
  message: string;
  className?: string;
}

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
};

const styles = {
  info: "bg-accent/10 border-accent/20 text-accent",
  success: "bg-success/10 border-success/20 text-success",
  warning: "bg-warning/10 border-warning/20 text-warning",
  error: "bg-destructive/10 border-destructive/20 text-destructive",
};

export function BannerAlert({ type, title, message, className }: BannerAlertProps) {
  const Icon = icons[type];

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg border",
        styles[type],
        className
      )}
    >
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="space-y-1">
        {title && <p className="font-medium text-sm">{title}</p>}
        <p className="text-sm opacity-90">{message}</p>
      </div>
    </div>
  );
}

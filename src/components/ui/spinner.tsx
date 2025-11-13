import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-solid border-m-green border-t-transparent",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Cargando"
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = "Cargando..." }: LoadingOverlayProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <Spinner size="lg" />
      <p className="text-m-green-dark text-sm">{message}</p>
    </div>
  );
}


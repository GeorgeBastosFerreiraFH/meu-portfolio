import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-4 right-4 z-[100] flex w-auto flex-col space-y-2 p-2",
      "sm:top-2 sm:right-2 sm:max-w-[90%]",
      "md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const Toast = React.forwardRef(
  (
    { className, variant, title, description, duration = 5000, ...props },
    ref
  ) => {
    const [progress, setProgress] = React.useState(100);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(0, prev - 100 / (duration / 100)));
      }, 100);
      return () => clearInterval(interval);
    }, [duration]);

    // Definição das cores da barra de progresso
    const progressBarColor =
      variant === "destructive" || variant === "success"
        ? "bg-white"
        : "bg-black";

    return (
      <ToastPrimitives.Root
        ref={ref}
        className={cn(
          "group relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
          "data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-top-full",
          variant === "destructive" && "bg-red-500 text-white border-red-600",
          variant === "success" && "bg-green-500 text-white border-green-600",
          !variant && "bg-white border-gray-200 text-black",
          className
        )}
        {...props}
      >
        <div className="grid gap-1">
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
        </div>
        <ToastClose />

        {/* Barra de progresso corrigida para ocupar 100% sem falha */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="h-[5px] w-full bg-opacity-20">
            <div
              className={`${progressBarColor} h-full transition-all duration-100`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </ToastPrimitives.Root>
    );
  }
);
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "group-[.destructive]:border-white/30 group-[.destructive]:hover:border-white/30 group-[.destructive]:hover:bg-white group-[.destructive]:hover:text-red-600",
      "group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
      "group-[.destructive]:text-white group-[.destructive]:hover:text-white",
      "group-[.success]:text-white group-[.success]:hover:text-white",
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};

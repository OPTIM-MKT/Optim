import React from "react";

export type ButtonVariant = "primary" | "black&white" | "simple" | "glass";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  isFalse?: boolean;
  isImage?: boolean;
  href?: string;
  className?: string;
  asChild?: boolean;
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    { variant = "primary", icon, isFalse = false, isImage = false, href, className = "", children, ...props },
    forwardedRef
  ) => {
    // Determine base classes
    const baseClasses =
      "inline-flex items-center justify-center gap-2 transition-transform duration-300 font-semibold uppercase tracking-[0.2em]";
      
    // Determine sizes and borders
    let sizeClasses = "";
    let variantClasses = "";

    switch (variant) {
      case "primary":
        sizeClasses = "px-5 py-2.5 text-xs rounded-full hover:-translate-y-0.5";
        variantClasses = "bg-ink text-canvas";
        break;
      case "black&white":
        sizeClasses = "px-5 py-2.5 text-xs rounded-full hover:-translate-y-0.5";
        if (isImage) {
          variantClasses = "bg-white text-black transition-colors hover:bg-white/90";
        } else {
          variantClasses = "border border-ink bg-canvas text-ink hover:bg-ink hover:text-canvas";
        }
        break;
      case "simple":
        sizeClasses = "px-4 py-2 text-xs rounded-full border border-line hover:bg-panel";
        variantClasses = "bg-transparent text-ink transition-colors duration-300";
        break;
      case "glass":
        sizeClasses = "h-10 w-10 md:h-12 md:w-12 rounded-full border";
        variantClasses = "border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/20";
        break;
    }

    // Bounce animation if isFalse is true
    const bounceClass = isFalse ? "animate-bounce" : "";

    // Combine classes
    const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${bounceClass} ${className}`.trim();

    if (href) {
      return (
        <a
          href={href}
          className={combinedClasses}
          ref={forwardedRef as React.Ref<HTMLAnchorElement>}
          {...(props as any)}
        >
          {icon && <span className="shrink-0 text-lg">{icon}</span>}
          {children}
        </a>
      );
    }

    return (
      <button
        className={combinedClasses}
        ref={forwardedRef as React.Ref<HTMLButtonElement>}
        {...(props as any)}
      >
        {icon && <span className="shrink-0 text-lg">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-medium",
    "transition-[background,box-shadow,transform,color] duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:transition-transform",
    "active:translate-y-px",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // Metallic dark – subtle vertical gradient with inset highlight + soft shadow
        dark: [
          "text-white",
          "bg-gradient-to-b from-[#0c2c39] to-ink",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_1px_rgba(0,29,41,0.25),0_4px_10px_-4px_rgba(0,29,41,0.35)]",
          "hover:from-[#103747] hover:to-ink-700",
          "active:from-ink-700 active:to-ink-800",
        ].join(" "),
        // Metallic azure
        primary: [
          "text-white",
          "bg-gradient-to-b from-[#1ab1ed] to-azure-600",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_1px_rgba(1,108,155,0.3),0_4px_10px_-4px_rgba(1,108,155,0.4)]",
          "hover:from-[#2bb9ee] hover:to-azure-500",
          "active:from-azure-600 active:to-azure-700",
        ].join(" "),
        // Metallic accent
        accent: [
          "text-ink",
          "bg-gradient-to-b from-[#fee64a] to-accent-500",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_1px_1px_rgba(168,143,0,0.25),0_4px_10px_-4px_rgba(168,143,0,0.3)]",
          "hover:from-[#feeb6b] hover:to-accent-400",
          "active:from-accent-500 active:to-accent-600",
        ].join(" "),
        // Soft outline button – glass-paper feel
        outline: [
          "text-ink",
          "bg-gradient-to-b from-white to-ink-50",
          "border border-ink/12",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,29,41,0.04)]",
          "hover:from-white hover:to-white hover:border-ink/20",
          "active:from-ink-50 active:to-ink-100",
        ].join(" "),
        ghost: "text-ink hover:bg-ink-50 active:bg-ink-100",
        link: "text-azure hover:text-azure-700 px-0 h-auto rounded-none active:translate-y-0",
      },
      size: {
        xs: "h-7 px-2.5 text-[12px]",
        sm: "h-8 px-3.5 text-[12.5px]",
        md: "h-9 px-4 text-[13px]",
        lg: "h-10 px-5 text-[13.5px]",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "sm",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

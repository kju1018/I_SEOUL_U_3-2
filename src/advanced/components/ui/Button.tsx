import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/styles";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-gray-900 text-white hover:bg-gray-800",
        secondary: "bg-yellow-400 text-gray-900 hover:bg-yellow-500",
        danger: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
        ghost: "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
        link: "text-indigo-600 hover:text-indigo-900 p-0 h-auto",
      },
      size: {
        sm: "px-2.5 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base font-semibold",
        icon: "w-8 h-8 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({
  className,
  variant,
  size,
  fullWidth,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  );
};

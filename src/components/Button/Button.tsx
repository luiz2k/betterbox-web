import { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

type Button = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    children?: React.ReactNode;
  };

const button = tv({
  base: "flex gap-2 rounded border p-1 duration-200",
  variants: {
    theme: {
      adaptable:
        "bg-color-4/10 hover:bg-color-4/5 dark:bg-color-2/10 dark:hover:bg-color-2/5",
      adaptableFill:
        " bg-color-4 text-color-2 hover:bg-color-4/80 dark:bg-color-2 dark:text-color-4 dark:hover:bg-color-2/80",
      green:
        "border-green-500 bg-green-500/10 text-green-500 hover:bg-green-500/5",
      greenFill:
        "border-green-500 bg-green-500 text-green-900 hover:bg-green-600",
      red: "border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500/5",
      refFill: "border-red-500 bg-red-500 text-red-900 hover:bg-red-600",
    },
  },
  defaultVariants: {
    rounded: "rounded",
    theme: "adaptable",
  },
});

const Button = ({ leftIcon, rightIcon, theme, children, ...props }: Button) => {
  return (
    <button {...props} className={button({ theme })}>
      {leftIcon && <>{leftIcon}</>}
      {children && <>{children}</>}
      {rightIcon && <>{rightIcon}</>}
    </button>
  );
};

export default Button;

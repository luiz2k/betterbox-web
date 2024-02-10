import { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

type Button = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    children?: React.ReactNode;
  };

const button = tv({
  base: "flex gap-2 rounded duration-200",
  variants: {
    theme: {
      adaptable:
        "border border-color-4 bg-color-4 text-color-2 hover:bg-color-4/80 dark:border-color-2 dark:bg-color-2 dark:text-color-4 dark:hover:bg-color-2/80",
      green:
        "border border-green-500 bg-green-500/40 text-green-500 hover:bg-green-500/20",
      greenFill:
        "border border-green-500 bg-green-500 text-green-900 hover:bg-green-500/80",
      red: "border border-red-500 bg-red-500/40 text-red-500 hover:bg-red-500/20",
      redFill:
        "border border-red-500 bg-red-500 text-red-900 hover:bg-red-500/80",
      orange:
        "border border-orange-500 bg-orange-500/40 text-orange-500 hover:bg-orange-500/20",
      orangeFill:
        "border border-orange-500 bg-orange-500 text-orange-900 hover:bg-orange-500/80",
      gray: "border border-gray-500 bg-gray-500/40 text-gray-500 hover:bg-gray-500/20",
      grayFill:
        "border border-gray-500 bg-gray-500 text-gray-900 hover:bg-gray-500/80",
    },
    textColor: {
      black: "text-slate-900",
      white: "text-slate-200",
    },
    paddingX: {
      small: "px-0.5",
      normal: "px-1",
      medium: "px-2",
      large: "px-3",
    },
    paddingY: {
      small: "py-0.5",
      normal: "py-1",
      medium: "py-2",
      large: "py-3",
    },
    Weight: {
      normal: "font-normal",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    theme: "adaptable",
    paddingX: "normal",
    paddingY: "normal",
    Weight: "normal",
  },
});

const Button = ({
  leftIcon,
  rightIcon,
  theme,
  textColor,
  paddingX,
  paddingY,
  Weight,
  children,
  ...props
}: Button) => {
  return (
    <button
      {...props}
      className={button({ theme, textColor, paddingX, paddingY, Weight })}
    >
      {leftIcon && <>{leftIcon}</>}
      {children && <>{children}</>}
      {rightIcon && <>{rightIcon}</>}
    </button>
  );
};

export default Button;

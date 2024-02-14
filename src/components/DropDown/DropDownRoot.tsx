import Button from "../Button/Button";

type DropDownRootProps = {
  className: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  children: React.ReactNode;
  onClick?: () => void;
};

const DropDownRoot = ({
  className,
  leftIcon,
  rightIcon,
  onClick,
  children,
}: DropDownRootProps) => {
  return (
    <div className={`relative ${className}`}>
      <Button leftIcon={leftIcon} rightIcon={rightIcon} onClick={onClick} />
      {children}
    </div>
  );
};

export default DropDownRoot;

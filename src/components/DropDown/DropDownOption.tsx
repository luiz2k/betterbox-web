import Button from "../Button/Button";

type typeButton = Button;

type DropDownOptionProps = {
  children: React.ReactNode;
} & typeButton;

const DropDownOption = ({ children, ...props }: DropDownOptionProps) => {
  return (
    <li className="rounded-md bg-color-2 dark:bg-color-4">
      <Button theme="grayFill" textColor="white" width="full" {...props}>
        {children}
      </Button>
    </li>
  );
};

export default DropDownOption;

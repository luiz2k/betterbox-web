type DropDownMenuProps = {
  children: React.ReactNode;
  animation: boolean;
};

const DropDownMenu = ({ children, animation }: DropDownMenuProps) => {
  return (
    <menu
      data-animation={animation}
      className="invisible absolute right-0 top-10 translate-y-2 space-y-0.5 rounded bg-color-4 p-1 text-color-2 opacity-0 duration-200 data-[animation=true]:visible data-[animation=true]:translate-y-0 data-[animation=true]:opacity-100 dark:bg-color-2 dark:text-color-4"
    >
      {children}
    </menu>
  );
};

export default DropDownMenu;

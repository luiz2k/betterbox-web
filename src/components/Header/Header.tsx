import Logo from "./Logo";
import Bars from "./Bars";
import SideButtons from "./SideButtons";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-color-2 dark:bg-color-4">
      <div className="flex h-20 items-center justify-between gap-5 border-b bg-color-2 p-5 text-base dark:bg-color-4">
        <Logo />

        <Bars />

        <SideButtons />
      </div>
    </header>
  );
};

export default Header;

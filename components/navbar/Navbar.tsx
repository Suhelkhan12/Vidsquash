import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-24">
      <Logo />
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;

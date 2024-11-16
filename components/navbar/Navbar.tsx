import Link from "next/link";
import { Button } from "../ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className=" py-4 px-6 md:px-24 ">
      <div className="flex items-center justify-between ">
        <Logo />
        <div className="flex items-center gap-2">
          <Link href={"/condense"}>
            <Button>Condense videos</Button>
          </Link>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

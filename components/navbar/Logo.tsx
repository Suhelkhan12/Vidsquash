import Link from "next/link";
import { Clapperboard } from "lucide-react";

const Logo = () => {
  return (
    <Link href="/">
      <span className="text-xl font-semibold">
        <Clapperboard className="size-8" />
      </span>
    </Link>
  );
};

export default Logo;

import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className=" text-center pb-4">
      Made with <span className="text-red-500">♥️</span> by{" "}
      <Link
        href={"https://www.linkedin.com/in/suhell-khan/"}
        target="_blank"
        className="text-blue-500"
      >
        Suhel
      </Link>
    </div>
  );
};

export default Footer;

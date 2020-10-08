import React from "react";
import Link from "next/link";

import Drawer from "../components/NavBar/Drawer";
import TogglBtn from "../components/NavBar/TogglBtn";
import BackDoor from "../components/NavBar/BackDoor";
//import headerStyles from "./header.module.scss"

const Header = () => {
  const [nav, setNav] = React.useState(false);

  const openNav = () => {
    setNav(!nav);
  };
  const closeNav = () => {
    setNav(false);
  };
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">
          <a>
            <img src="/images/logo.png" alt="dagalaxy logo" />
          </a>
        </Link>
      </div>
      <Drawer nav={nav} />
      {nav && <BackDoor closeNav={closeNav} />}

      <TogglBtn openNav={openNav} nav={nav} />
    </header>
  );
};

export default Header;

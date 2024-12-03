"use client";
import { NavbarType } from "@/types/main";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EachUtils from "./eachutils";
import ButtonToggleTheme from "./button-toggle-theme";
import NavbarMobile from "./navbar-mobile";
import { getUser, logout } from "@/lib/supabase/server";

export const navList: NavbarType[] = [
  {
    display: "Home",
    path: "/",
  },
];

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  async function init() {
    const user = await getUser();
    if (user) {
      setIsLogin(true);
    }
  }
  useEffect(() => {
    init();
  }, []);
  async function handleClickLogout() {
    await logout();
  }
  return (
    <>
      <nav className="bg-slate-200 fixed dark:bg-gray-900 bg-opacity-35 dark:bg-opacity-90 backdrop-filter backdrop-blur w-full top-0 z-50 shadow inset-x-0">
        <div className="h-14 flex justify-between items-center px-4">
          <h1 className="text-4xl font-bold">Wikiarticle</h1>
          <div className="lg:flex hidden gap-7 items-center">
            <EachUtils of={navList} render={(item) => renderLink(item)} />
            {isLogin && (
              <a
                className="hover:underline font-medium cursor-pointer"
                onClick={handleClickLogout}
              >
                Logout
              </a>
            )}
            <ButtonToggleTheme />
          </div>
          <NavbarMobile
            isLogin={isLogin}
            handleClickLogout={handleClickLogout}
          />
        </div>
      </nav>
      <div className="pb-20"></div>
    </>
  );
};

function renderLink(item: NavbarType) {
  return (
    <Link href={item.path} className="hover:underline font-medium">
      {item.display}
    </Link>
  );
}

export default Navbar;

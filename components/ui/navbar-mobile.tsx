"use client";
import React, { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Menu } from "lucide-react";
import EachUtils from "./eachutils";
import { navList } from "./navbar";
import { Button } from "./button";
import ButtonToggleTheme from "./button-toggle-theme";

type Props = {
  isLogin: boolean;
  handleClickLogout: () => void;
};

const NavbarMobile: FC<Props> = ({ isLogin, handleClickLogout }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="lg:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold">Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-5 flex flex-col gap-4">
            <EachUtils
              of={navList}
              render={(item) => (
                <Button className="w-full">{item.display}</Button>
              )}
            />
            {isLogin && (
              <Button className="w-full" onClick={handleClickLogout}>
                Logout
              </Button>
            )}
            <ButtonToggleTheme sizeButton="default" />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavbarMobile;

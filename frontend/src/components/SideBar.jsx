
"use client";

import { Button, Drawer, Sidebar } from "flowbite-react";
import { useState } from "react";
import { BiBuoy } from "react-icons/bi";
import { HiChartPie, HiViewBoards } from "react-icons/hi";
import { sign_out } from "../services/auth";

export function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const Logout = async (e) => {
    e.preventDefault();
    await sign_out();
    window.localStorage.clear();
    window.location.reload(false);
};

  return (
    <>
    <Sidebar className="hidden lg:flex">
      <Sidebar.Items className="flex flex-col justify-between h-full">
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiChartPie} onClick={() => {window.localStorage.setItem("view", "Dashboard"); window.location.reload(false)}}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item icon={HiViewBoards} onClick={() => {window.localStorage.setItem("view", "Decks"); window.location.reload(false)}}>
            Decks
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={BiBuoy} onClick={e => Logout(e)}>
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
      <div className="absolute top-0 left-0 flex h-16 items-center justify-start lg:hidden">
        <Button color="transparent" onClick={() => setIsOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
        </Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} className="w-1/2 h-full">
        <Drawer.Items>
          <Sidebar className="[&>div]:bg-transparent [&>div]:p-0">
              <Sidebar.Items className="flex flex-col justify-betweenk h-full">
                <Sidebar.ItemGroup>
                  <Sidebar.Item icon={HiChartPie} onClick={() => {window.localStorage.setItem("view", "Dashboard"); window.location.reload(false)}}>
                        Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item icon={HiViewBoards} onClick={() => {window.localStorage.setItem("view", "Decks"); window.location.reload(false)}}>
                        Decks
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                  <Sidebar.Item icon={BiBuoy} onClick={e => Logout(e)}>
                        Logout
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}

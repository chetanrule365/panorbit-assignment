import React, { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChatIcon from "../assets/Chat";
import ChevronDownIcon from "../assets/ChevronDown";
import ChevronUpIcon from "../assets/ChevronUp";
import SideBarIcon from "../assets/SideBar";
import ChevronRight from "../assets/ChevronRight";

function Sidebar() {
  const menuItems = [
    {
      text: "Profile",
      path: "/profile",
    },
    {
      text: "Posts",
      path: "/posts",
    },
    {
      text: "Gallery",
      path: "/gallery",
    },
    {
      text: "ToDo",
      path: "/todo",
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="w-[70%] h-full max-w-[280px] bg-gradient-to-b from-primary to-secondary rounded-3xl flex flex-col items-center justify-center">
      <div className="w-full flex relative">
        <div className="w-full pl-8 pr-2">
          {menuItems?.map(({ text, path }) => (
            <div
              key={text}
              className="border-b-[1px] last-of-type:border-none border-white border-opacity-50 py-4"
            >
              <button
                className={clsx(
                  "text-xl font-semibold text-white hover:text-white",
                  {
                    "opacity-50": pathname !== path,
                  }
                )}
                onClick={() => navigate(path, { replace: true })}
              >
                {text}
              </button>
            </div>
          ))}
        </div>
        <div
          className={clsx("absolute right-0", {
            "top-[60px]": pathname === "/posts",
            "top-[120px]": pathname === "/gallery",
            "top-[180px]": pathname === "/todo",
          })}
        >
          <SideBarIcon />
          <div className="absolute top-[21.5px] right-0">
            <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ title = "Profile" }) {
  const user = useSelector((state) => state.users.currentUser);
  const { name, profilepicture } = user || {};

  return (
    <div className="border-b-[1px] border-gray-300 w-full pb-6 flex justify-between items-center">
      <h2 className="font-semibold text-2xl text-gray-600">{title}</h2>
      <div className="flex items-center gap-3">
        <img
          src={profilepicture}
          alt="profile"
          className="w-9 h-9 object-cover rounded-full"
        />
        <p className="text-gray-600 text-lg">{name}</p>
      </div>
    </div>
  );
}

function ChatBox() {
  const usersList = useSelector((state) => state.users.list);
  const currentUser = useSelector((state) => state.users.currentUser);

  const [isOpen, setIsOpen] = useState(false);

  const filteredUsers = usersList?.filter((user) => user.id !== currentUser.id);

  return (
    <div className="fixed bottom-0 right-24">
      <div
        className="bg-primary h-[60px] rounded-t-xl flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <ChatIcon />
          <p className="text-xl text-white">Chats</p>
        </div>
        {isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </div>
      <div
        className={clsx(
          "bg-white overflow-y-scroll border-primary border-l-2 border-r-2",
          { "h-0": !isOpen, "h-[300px]": isOpen }
        )}
      >
        {filteredUsers?.map(({ id, name, profilepicture }) => (
          <div
            key={id}
            className="px-4 py-1 flex items-center justify-between gap-6 cursor-pointer"
          >
            <div className="flex items-center gap-3 max-w-[210px] overflow-hidden">
              <img
                src={profilepicture}
                alt="profile"
                className="w-9 h-9 object-cover rounded-full"
              />
              <p className="line-clamp-1">{name}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className="p-8 min-w-[1440px] m-auto h-screen flex gap-4 overflow-hidden">
      <Sidebar />
      <div className="px-8 py-4 w-full">
        <Header />
        {children}
        <ChatBox />
      </div>
    </div>
  );
}

export default Layout;

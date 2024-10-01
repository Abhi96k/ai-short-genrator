"use client";
import React from "react";
import Link from "next/link";
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react"; // Import the icons correctly
import { usePathname } from "next/navigation";

function SideNav() {
  const MenuOptions = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: PanelsTopLeft, // Use the correct imported icon
    },
    {
      id: 2,
      name: "Create New",
      path: "/dashboard/create-new",
      icon: FileVideo,
    },
    {
      id: 3,
      name: "Upgrade",
      path: "/upgrade",
      icon: ShieldPlus,
    },
    {
      id: 4,
      name: "Account",
      path: "/account",
      icon: CircleUser,
    },
  ];

  const path = usePathname();

  return (
    <div className="w-64 h-screen shadow-md p-5">
      <div className="grid gap-3">
        {MenuOptions.map((item) => (
          <Link key={item.id} href={item.path}>
            <div
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors duration-200 ${
                path === item.path
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <item.icon
                size={20}
                className={`${
                  path === item.path ? "text-white" : "text-gray-600"
                }`}
              />
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;

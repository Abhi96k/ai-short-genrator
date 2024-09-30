import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-3">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
          <h1 className="text-2xl font-bold text-gray-800">Ai Short Video</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button>Dashboard</Button>
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default Header;

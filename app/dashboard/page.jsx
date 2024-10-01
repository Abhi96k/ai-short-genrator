"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";

function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  return (
    <div>
      <div className="flex justify-between item-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
        <Link href={"/dashboard/create-new"}>
          <Button>Create New Shorts</Button>
        </Link>
      </div>

      {/*Empty video list message*/}

      {videoList?.length === 0 && (
        <div>
          <EmptyState />
        </div>
      )}
    </div>
  );
}

export default Dashboard;

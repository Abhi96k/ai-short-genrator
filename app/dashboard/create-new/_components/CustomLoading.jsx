"use client";
import React from "react";
import Image from "next/image";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <div className="flex flex-col items-center justify-center my-5">
          <Image
            src={"/work-in-progress.gif"}
            alt="loading"
            width={100}
            height={100}
            unoptimized={true}
          />
          <h2 className="text-center mt-4">
            Generating your Video... Dont not refresh
          </h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;

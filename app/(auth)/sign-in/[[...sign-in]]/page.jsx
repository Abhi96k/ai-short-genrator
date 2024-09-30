import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="hidden md:flex justify-center items-center">
        <Image src="/login.jpg" alt="login" width={500} height={500} />
      </div>
      <div className="flex justify-center items-center">
        <SignIn />
      </div>
    </div>
  );
}

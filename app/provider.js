"use client";
import { useUser } from "@clerk/nextjs";
import { db } from "../configs/db";
import { User } from "../configs/schema";
import { useEffect } from "react";
import { eq } from "drizzle-orm";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      isNewUser();
    }
  }, [user]);

  const isNewUser = async () => {
    try {
      const result = await db
        .select()
        .from(User)
        .where(eq(User.email, user?.primaryEmailAddress?.emailAddress));

      console.log(result);

      if (!result.length) {
        await db.insert(User).values({
          name: user.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          imageUrl: user?.imageUrl || null,
        });
        console.log("New user added to the database");
      }
    } catch (error) {
      console.error("Error inserting new user:", error);
    }
  };

  return <div>{children}</div>;
}

export default Provider;

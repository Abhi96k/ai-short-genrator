import { pgTable, serial, varchar, boolean } from "drizzle-orm/pg-core"; // Ensure correct imports

export const User = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  imageUrl: varchar("imageUrl"),
  subscription: boolean("subscription").default(false),
});

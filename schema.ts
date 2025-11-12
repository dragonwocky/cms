import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").unique().primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  email: text("email"),
});

import { drizzle } from "drizzle-orm/postgres-js";
import process from "node:process";
import postgres from "postgres";
import {
  customType,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const bytea = customType<{ data: Uint8Array }>({
  dataType: () => "bytea",
});

const users = pgTable("users", {
    id: uuid("id").unique().primaryKey().defaultRandom().notNull(),
    name: text("name").notNull(),
    email: text("email"),
  }),
  sessions = pgTable("sessions", {
    id: text("id").unique().primaryKey().notNull(),
    user: uuid("user").references(() => users.id),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    secretHash: bytea("secret_hash").notNull(),
  });

export { sessions, users };
export default drizzle({
  client: postgres(process.env.DATABASE_URL!),
  schema: { sessions, users },
});

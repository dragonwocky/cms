import { drizzle } from "drizzle-orm/postgres-js";
import { buildSchema } from "drizzle-graphql";
import process from "node:process";
import postgres from "postgres";
import * as schema from "./schema.ts";
import { createYoga } from "graphql-yoga";

const db = drizzle({ client: postgres(process.env.DATABASE_URL!), schema }),
  yoga = createYoga(buildSchema(db));

const route = (pathname: string) => new URLPattern({ pathname }),
  onListen = ({ hostname, port }: Deno.NetAddr) => {
    console.log(`Listening...`);
    console.log(`✨ http://${hostname}:${port}`);
    console.log(`✨ http://${hostname}:${port}/graphql`);
  };
Deno.serve({ onListen }, (req) => {
  if (route("/graphql").test(req.url)) return yoga(req);
  return new Response("Hello world!");
});
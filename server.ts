import { dev } from "astro";
import { buildSchema } from "drizzle-graphql";
import { drizzle } from "drizzle-orm/postgres-js";
import { createYoga } from "graphql-yoga";
import process from "node:process";
import postgres from "postgres";
import * as schema from "./schema.ts";

const db = drizzle({ client: postgres(process.env.DATABASE_URL!), schema }),
  yoga = createYoga(buildSchema(db));

const route = (pathname: string) => new URLPattern({ pathname }),
  onListen = ({ hostname, port }: Deno.NetAddr) => {
    console.log(`\nListening...`);
    console.log(`✨ http://${hostname}:${port}`);
    console.log(`✨ http://${hostname}:${port}/graphql`);
    console.log(`✨ http://${hostname}:${port}/admin\n`);
  };
Deno.serve({ onListen }, (req) => {
  const url = new URL(req.url);
  if (route("/graphql{/}?").test(url)) return yoga(req);
  if (process.env.NODE_ENV === "dev") {
    const proxy = new URL(url.pathname, "http://localhost:4321/");
    return fetch(proxy, { ...req });
  }
  return import("./dist/server/entry.mjs").then(({ handle }) => handle(req));
});
if (process.env.NODE_ENV == "dev") await dev({});

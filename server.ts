import { serveDir } from "@std/http/file-server";
import { dev } from "astro";
import { buildSchema } from "drizzle-graphql";
import { createYoga } from "graphql-yoga";
import process from "node:process";
import db from "./schema.ts";

// const yoga = createYoga(buildSchema(db));

if (process.env.NODE_ENV == "dev") await dev({ logLevel: "warn" });
const astro = (req: Request) => {
    const proxy = new URL(req.url);
    proxy.port = process.env.ASTRO_DEV!;
    return fetch(proxy, {
      headers: req.headers,
      method: req.method,
      body: req.body,
    });
  },
  ssg = (req: Request) =>
    serveDir(req, { fsRoot: "./dist/client", quiet: true }),
  ssr = (req: Request) =>
    (import("./dist/server/entry.mjs")).then(({ handle }) => handle(req));

const time = (date: Date) => {
    const pad = (n: number) => ("" + n).padStart(2, "0"),
      HH = date.getHours(),
      mm = date.getMinutes(),
      ss = date.getSeconds();
    return `${pad(HH)}:${pad(mm)}:${pad(ss)}`;
  },
  duration = (a: Date, b: Date) => `${b.getTime() - a.getTime()}ms`;

const matchRoute = (url: string, pathname: string) =>
    new URLPattern({ pathname }).test(url),
  handleRoute = async (req: Request) => {
    // if (matchRoute(req.url, "/graphql{/}?")) return yoga(req); else
    if (process.env.NODE_ENV == "dev") return astro(req);
    const res = await ssg(req);
    if (res.status === 404) return ssr(req);
  };

const onListen = ({ hostname, port }: Deno.NetAddr) => {
    console.log(`\n%c Listening... `, "background-color: green");
    console.log(`✨ http://${hostname}:${port}`);
    console.log(`✨ http://${hostname}:${port}/graphql`);
    console.log(`✨ http://${hostname}:${port}/admin\n`);
  },
  onRequest = (req: Request, reqTime: Date, res: Response) => {
    const { pathname } = new URL(req.url),
      HHmmss = time(reqTime),
      ms = duration(reqTime, new Date());
    if (!matchRoute(req.url, "/(\\.|_|~|@|node_modules)(.+)")) {
      console.log(
        `%c${HHmmss} %c[${res.status}] %c${req.method} ${pathname} %c${ms}`,
        "color: grey",
        `color: ${200 <= res.status && res.status < 400 ? "blue" : "yellow"}`,
        "color: auto",
        "color: grey",
      );
    }
    return res;
  };

Deno.serve({ onListen }, async (req) => {
  const reqTime = new Date();
  return onRequest(req, reqTime, await handleRoute(req));
});

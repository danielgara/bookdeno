import { serve } from "https://deno.land/std@0.84.0/http/server.ts";
import { v4 } from "https://deno.land/std@0.92.0/uuid/mod.ts";
import { PostItDaniel } from "./PostItDaniel.ts";

const PORT = 8080;
const HOST = "localhost";
const PROTOCOL = "http";
const server = serve({ port: PORT, hostname: HOST });

let posts = [
  new PostItDaniel("Read more", "3209ebc7-b3b4-4555-88b1-b64b33d507ab", "PacktPub books"),
  new PostItDaniel("Finish book", "a1afee4a-b078-4eff-8ca6-06b3722eee2c", "Deno Web Development"),
];

console.log(`Server running at ${HOST}:${PORT}`);
for await (const req of server) {
  const url = new URL(`${PROTOCOL}://${HOST}${req.url}`);
  const headers = new Headers();
  headers.set("content-type", "application/json");

  const pathWithMethod = `${req.method} ${url.pathname}`;
  switch (pathWithMethod) {
    case "GET /api/post-its": {
      req.respond({ headers, body: JSON.stringify({ postIts: posts }) });
      continue;
    }
    // example in my postman
    case "POST /api/post-its": {
      const body = await Deno.readAll(req.body);
      let decode = new TextDecoder().decode(body);
      const decoded = JSON.parse(decode);
      //console.log(decoded); //console.log(decoded.title);

      const id = v4.generate();
      let post = new PostItDaniel(decoded.title, id, decoded.body);
      posts.push(post);

      req.respond({ status: 201, body: JSON.stringify(posts), headers });
      continue;
    }
    default:
      req.respond({ status: 404 });
  }
}
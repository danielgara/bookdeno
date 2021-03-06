import { serve } from "https://deno.land/std@0.83.0/http/server.ts";
import type { MuseumControllerInterface } from "../interfaces/MuseumInterfaces.ts";

export async function createServer(
  port: number,
  museum: MuseumControllerInterface,
) {
  const server = serve({ port });

  console.log(`Server running at http://localhost:${port}`);
  for await (let req of server) {
    if (req.url === "/api/museums" && req.method === "GET") {
      req.respond({
        body: JSON.stringify({
          museums: await museum.getAll(),
        }),
        status: 200,
      });

      continue;
    }

    req.respond({ body: "museums api", status: 200 });
  }
}

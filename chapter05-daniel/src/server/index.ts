import type { MuseumControllerInterface } from "../interfaces/MuseumInterfaces.ts";
import type { UserControllerInterface } from "../interfaces/UserInterfaces.ts";
import { Application, Router } from "../deps.ts";

export async function createServer(
  port: number,
  museum: MuseumControllerInterface,
  user: UserControllerInterface,
) {
  const app = new Application();

  app.addEventListener("listen", (e:any) => {
    console.log(
      `Application running at http://${e.hostname || "localhost"}:${port}`,
    );
  });

  app.addEventListener("error", (e:any) => {
    console.log("An error occurred", e.message);
  });

  const apiRouter = new Router({ prefix: "/api" });

  apiRouter.get("/museums", async (ctx:any) => {
    ctx.response.body = {
      museums: await museum.getAll(),
    };
  });

  apiRouter.post("/users/register", async (ctx:any) => {
    const { username, password } = await ctx.request.body({ type: "json" })
      .value;

    if (!username || !password) {
      ctx.response.status = 400;

      return;
    }

    try {
      const createdUser = await user.register(username, password);

      ctx.response.status = 201;
      ctx.response.body = { user: createdUser };
    } catch (e) {
      ctx.response.status = 400;
      ctx.response.body = { message: e.message };
    }
  });

  app.use(apiRouter.routes());
  app.use(apiRouter.allowedMethods());

  app.use((ctx:any) => {
    ctx.response.body = "Hello World!";
  });

  await app.listen({ port });
}

import { red } from "https://deno.land/std@0.84.0/fmt/colors.ts";

const [path = "."] = Deno.args;
for await (const dir of Deno.readDir(path)) {
  if (dir.isDirectory) {
    console.log(red(dir.name));
  } else {
    console.log(dir.name);
  }
}
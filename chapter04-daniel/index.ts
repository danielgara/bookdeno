import { createServer } from "./server/index.ts";
import { MuseumController } from "./controllers/MuseumController.ts";
import { MuseumDAO } from "./models/MuseumDAO.ts";
import { Museum } from "./models/Museum.ts";

const museumDAO = new MuseumDAO();
const m1 = new Museum(
  "1fbdd2a9-1b97-46e0-b450-62819e5772ff",
  "The Louvre",
  "The world's largest art museum and a historic monument in Paris, France.",
  {
    lat: "48.860294",
    lng: "2.338629",
  }
);
museumDAO.storage.set("1fbdd2a9-1b97-46e0-b450-62819e5772ff", m1);

const museumController = new MuseumController(museumDAO);

createServer(8080, museumController);

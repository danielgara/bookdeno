import { createServer } from "./server/index.ts";
import { MuseumController } from "./controllers/MuseumController.ts";
import { MuseumDAO } from "./models/MuseumDAO.ts";
import { Museum } from "./models/Museum.ts";
import { UserController } from "./controllers/UserController.ts";
import { UserDAO } from "./models/UserDAO.ts";

const museumDAO = new MuseumDAO();
const museumController = new MuseumController(museumDAO);
const m1 = new Museum(
  "1fbdd2a9-1b97-46e0-b450-62819e5772ff",
  "The Louvre",
  "The world's largest art museum and a historic monument in Paris, France.",
  {
    lat: "48.860294",
    lng: "2.338629",
  },
);
museumDAO.storage.set("1fbdd2a9-1b97-46e0-b450-62819e5772ff", m1);

const userDAO = new UserDAO();
const userController = new UserController(userDAO);

createServer(8080, museumController, userController);

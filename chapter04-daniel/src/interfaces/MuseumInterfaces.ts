import { Museum } from "../models/Museum.ts";

export interface MuseumDAOInterface {
  getAll: () => Promise<Museum[]>;
}

export interface MuseumControllerInterface {
  getAll: () => Promise<Museum[]>;
}

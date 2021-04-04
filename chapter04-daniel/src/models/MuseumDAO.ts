import { Museum } from "./Museum.ts";
import type { MuseumDAOInterface } from "../interfaces/MuseumInterfaces.ts";

export class MuseumDAO implements MuseumDAOInterface {
  storage = new Map<string, Museum>();

  async getAll() {
    return [...this.storage.values()];
  }
}
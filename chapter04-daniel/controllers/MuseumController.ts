import type { MuseumControllerInterface, MuseumDAOInterface } from "../interfaces/MuseumInterfaces.ts";

export class MuseumController implements MuseumControllerInterface {
  museumDAO: MuseumDAOInterface;

  constructor(museumDAO: MuseumDAOInterface) {
    this.museumDAO = museumDAO;
  }

  async getAll() {
    return this.museumDAO.getAll();
  }
}
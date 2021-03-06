import type { MuseumController, MuseumRepository } from "./index.ts";

interface ControllerDependencies {
  museumRepository: MuseumRepository;
}

export class Controller implements MuseumController {
  museumRepository: MuseumRepository;

  constructor({ museumRepository }: ControllerDependencies) {
    this.museumRepository = museumRepository;
  }

  async getAll() {
    return this.museumRepository.getAll();
  }
}

/*import type { MuseumController } from "./types.ts";

export class Controller implements MuseumController {
  async getAll() {
    return [];
  }
}*/

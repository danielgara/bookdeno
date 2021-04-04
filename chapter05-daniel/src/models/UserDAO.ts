import { User } from "./User.ts";
import type { UserDAOInterface } from "../interfaces/UserInterfaces.ts";

export class UserDAO implements UserDAOInterface {
  private storage = new Map<User["username"], User>();

  async create(user: User) {
    this.storage.set(user.getUsername(), user);

    return user;
  }

  async exists(username: string) {
    return Boolean(this.storage.get(username));
  }
}

import { User } from "../models/User.ts";
import type {
  UserControllerInterface,
  UserDAOInterface,
} from "../interfaces/UserInterfaces.ts";
import { generateSalt, hashWithSalt } from "../util/encryption.ts";

export class UserController implements UserControllerInterface {
  userDAO: UserDAOInterface;

  constructor(userDAO: UserDAOInterface) {
    this.userDAO = userDAO;
  }

  public async register(username: string, password: string) {
    if (await this.userDAO.exists(username)) {
      return Promise.reject("Username already exists");
    }

    const createdUser = await this.userDAO.create(
      await this.getHashedUser(username, password),
    );

    return createdUser;
  }

  private async getHashedUser(username: string, password: string) {
    const salt = generateSalt();
    const u1 = new User(username, hashWithSalt(password, salt), salt);

    return u1;
  }
}

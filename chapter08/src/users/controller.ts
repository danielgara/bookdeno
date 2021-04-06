import { userToUserDto } from "./adapter.ts";
import type {
  LoginPayload,
  RegisterPayload,
  User,
  UserController,
  UserRepository,
} from "./index.ts";
import { generateSalt, hashWithSalt } from "./util.ts";

interface ControllerDependencies {
  userRepository: UserRepository;
}

export class Controller implements UserController {
  userRepository: UserRepository;

  constructor({ userRepository }: ControllerDependencies) {
    this.userRepository = userRepository;
  }

  private async getHashedUser(username: string, password: string) {
    const salt = generateSalt();
    const user = {
      username,
      hash: hashWithSalt(password, salt),
      salt,
    };

    return user;
  }

  public async login(payload: LoginPayload) {
    try {
      //console.log("hola2");
      //console.log(payload);
      const user = await this.userRepository.getByUsername(payload.username);
      await this.comparePassword(payload.password, user);

      return { user: userToUserDto(user) };
    } catch (e) {
      throw new Error("Username and password combination is not correct");
    }
  }

  private async comparePassword(password: string, user: User) {
    const hashedPassword = hashWithSalt(password, user.salt);

    if (hashedPassword === user.hash) {
      return Promise.resolve(true);
    }

    return Promise.reject(false);
  }

  public async register(payload: RegisterPayload) {
    if (await this.userRepository.exists(payload.username)) {
      return Promise.reject("Username already exists");
    }

    const createdUser = await this.userRepository.create(
      await this.getHashedUser(payload.username, payload.password),
    );

    return userToUserDto(createdUser);
  }
}
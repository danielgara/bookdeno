import { User } from "../models/User.ts";

export interface UserDAOInterface {
  create: (user : User) => Promise<User>;
  exists: (username: string) => Promise<boolean>;
}

export interface UserControllerInterface {
  register: (username: string, password: string) => Promise<User>;
}

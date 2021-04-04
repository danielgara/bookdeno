export class User {
  private username: string;

  private hash: string;

  private salt: string;

  private createdAt: Date;

  public constructor(username: string, hash: string, salt: string) {
    this.username = username;
    this.hash = hash;
    this.salt = salt;
    this.createdAt = new Date();
  }

  public getUsername(): string {
    return this.username;
  }

  public getHash(): string {
    return this.hash;
  }

  public getSalt(): string {
    return this.salt;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}

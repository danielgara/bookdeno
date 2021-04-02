export class PostItDaniel {
  private title:string;

  private id:string;

  private body:string;

  private createdAt:Date;

  public constructor(title:string, id:string, body:string) {
    this.title = title;
    this.id = id;
    this.body = body;
    this.createdAt = new Date();
  }

	public getTitle() : string{
		return this.title;
	}

	public getId(): string {
		return this.id;
	}

	public getBody(): string {
		return this.body;
	}

	public getCreatedAt(): Date {
		return this.createdAt;
	}

}
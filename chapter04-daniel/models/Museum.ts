export class Museum {
  private id:string;

  private name:string;

  private description:string;

  private location: {
    lat: string;
    lng: string;
  };

  public constructor(id: string, name:string, description:string, location:{
    lat: string;
    lng: string;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
  }

	public getId(): string {
		return this.id;
	}

  public getName() : string{
		return this.name;
	}

	public getDescription(): string {
		return this.description;
	}

	public getLocation(): {lat:string, lng:string} {
		return this.location;
	}
}
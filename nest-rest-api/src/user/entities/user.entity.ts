export class User {
  id?: string;

  name: string;

  email: string;

  password: string;

  enabled?: boolean;

  public constructor(data: {
    id?: string;
    name: string;
    email: string;
    password: string;
    enabled?: boolean;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.enabled = data.enabled || true;
  }
}

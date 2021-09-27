import { AbstractEmailTemplate } from './AbstractEmailTamplate';

interface UserRegistartionTemplatePayload {
  name: string;
  role: string;
  login: string;
  password: string;
}

export class UserRegistrationTemplate extends AbstractEmailTemplate<UserRegistartionTemplatePayload> {
  
  constructor(params: UserRegistartionTemplatePayload) {
    super(params);
  }

  public getSubject(): string {
    return 'User registered'
  }

  public getText(): string {
    return 'This is email contain result user registration'
  }

  public getHTML(): string {
    return `
      <div>Dear ${this._params.name}:</div><br>
      <div>You have been registered to App as an ${this._params.role} with the following credentials:</div><br>
      <div>Login: ${this._params.login}<div><br>
      <div>Password: ${this._params.password}<div>
    `;
  }
}

import { AbstractEmailTemplate } from './AbstractEmailTamplate';

interface PasswordResetTemplatePayload {
  name: string;
  newPassword: string;
}

export class PasswordResetTemplate extends AbstractEmailTemplate<PasswordResetTemplatePayload> {
  
  constructor(params: PasswordResetTemplatePayload) {
    super(params);
  }

  public getSubject(): string {
    return 'Password Reset'
  }

  public getText(): string {
    return 'This is email contain result password reset'
  }

  public getHTML(): string {
    return `
      <div>Dear: ${this._params.name}</div><br>
      <div>Your password has been successfully reset: ${this._params.newPassword}</div>
    `;
  }
}

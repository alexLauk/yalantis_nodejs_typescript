
import { PasswordResetTemplate } from './PasswordResetTamplate';
import { UserRegistrationTemplate } from './UserRegistrationTemplate';
import { IEmailSender } from "./IEmailSender";
import { ClientResponse } from '@sendgrid/mail';

export class EmailService {
  constructor(private emailSender: IEmailSender) {}

  public async sendPasswordResetEmail(
      payload: { name: string, newPassword: string }, 
      toEmail: string
    ): Promise<[ClientResponse, {}]> {

    const template = new PasswordResetTemplate(payload);
    
    return this.emailSender.send(template, toEmail);
  }

  public async sendUserRegistrationEmail(
    paylaod: { 
      name: string,
      role: string,
      login: string,
      password: string 
    },
    toEmail: string,
  ): Promise<[ClientResponse, {}]> {

    const template = new UserRegistrationTemplate(paylaod);

    return this.emailSender.send(template, toEmail);
  }
}



import sgMail from '@sendgrid/mail';
import { AbstractEmailTemplate } from './AbstractEmailTamplate';
import { IEmailSender } from "./IEmailSender";

export class SendGridEmailSender implements IEmailSender {
  public async send<TPayload>(
    template: AbstractEmailTemplate<TPayload>,
    toEmail: string
  ) {
      const msg =  {
        to: toEmail,
        from: 'test@example.com',
        subject: template.getSubject(),
        text: template.getText(),
        html: template.getHTML(),
      };
      
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
      return sgMail.send(msg);
    }
}

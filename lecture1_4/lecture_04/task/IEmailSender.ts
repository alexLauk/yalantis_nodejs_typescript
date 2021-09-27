import { ClientResponse } from '@sendgrid/mail';
import { AbstractEmailTemplate } from './AbstractEmailTamplate';

export interface IEmailSender {
    send<TPayload>(
    template: AbstractEmailTemplate<TPayload>,
    toEmail: string
  ): Promise<[ClientResponse, {}]>
}

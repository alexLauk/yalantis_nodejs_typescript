import { EmailService } from "./EmailService";

import { SendGridEmailSender } from './SendGridEmailSender'

const sendGridEmailSender = new SendGridEmailSender()
const emailService = new EmailService(sendGridEmailSender);

( async () => {
  try {
    const result = await emailService.sendPasswordResetEmail({ name: 'Alex', newPassword: 'adsds'}, 'asad@gmail.com')
    console.log(result);
  } catch (error) {
    console.log(error);
  }
})()



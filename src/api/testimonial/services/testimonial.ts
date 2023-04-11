import nodemailer from 'nodemailer';
import { factories } from '@strapi/strapi';
import Mail from 'nodemailer/lib/mailer';
import SibApi from 'sib-api-v3-sdk';

const SibClient = SibApi.ApiClient.instance;
SibClient.authentications['api-key'].apiKey = process.env.SMTP_API_KEY || 'YOUR_API_KEY_HERE';

const transactionEmailApi = new SibApi.TransactionalEmailsApi();
let smtpMailData = new SibApi.SendSmtpEmail();

export default factories.createCoreService('api::testimonial.testimonial', ({ strapi }) => ({
  async sendEmail(options: Mail.Options) {
    const sender = {
      email: options.from,
      name: options.from,
    };

    try {
      smtpMailData.sender = sender;

      smtpMailData.to = [{
        email: options.to,
        name: 'автор'
      }];

      smtpMailData.subject = 'You are on the waitlist!';

      smtpMailData.params = {
        'name': 'автор',
        'twitter': '@makeuseof'
      };

      smtpMailData.htmlContent = "<html><body><p>Hello {{ params.name }}, "
        + "welcome to makeuseof.com waitlist. We'll notify you "
        + "when we launch. Kindly follow us on Twitter "
        + "{{ params.twitter }}.</p></body></html>";

      // send email
      await transactionEmailApi.sendTransacEmail(smtpMailData)
        .then((data) => {
          console.log(data) // log the email id
        })
        .catch((error) => {
          console.error(error)
          throw new Error(error) // handle errors
        })
    } catch (error) {
      console.log('An error occured...')
      console.error(error)
      throw new Error(error) // handle errors
    }
    // return transporter.sendMail(options);
  }
}));

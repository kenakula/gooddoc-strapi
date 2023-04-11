import { factories } from '@strapi/strapi';
import Mail from 'nodemailer/lib/mailer';
import SibApi from 'sib-api-v3-sdk';

const SibClient = SibApi.ApiClient.instance;
SibClient.authentications['api-key'].apiKey = process.env.SMTP_API_KEY || 'YOUR_API_KEY_HERE';

const transactionEmailApi = new SibApi.TransactionalEmailsApi();
let smtpMailData = new SibApi.SendSmtpEmail();

export default factories.createCoreService('api::testimonial.testimonial', () => ({
  async sendEmail(options: Mail.Options) {
    try {
      smtpMailData.sender = {
        email: options.from,
        name: 'StrapiAPP',
      };

      smtpMailData.to = [{
        email: options.to,
        name: 'Admin',
      }];

      smtpMailData.subject = options.subject;
      smtpMailData.htmlContent = options.html;

      await transactionEmailApi.sendTransacEmail(smtpMailData);
    } catch (error) {
      console.log('An error occured: ', error)
    }
  }
}));

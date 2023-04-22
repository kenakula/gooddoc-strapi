import { factories } from '@strapi/strapi';
import { RequestModel } from '../../../shared/models/request.model';
import { transporter } from '../../../shared/assets';
import Mail from 'nodemailer/lib/mailer';
import {
  clinicRequestTemplate,
  doctorRequestTemplate,
  simpleRequestTemplate,
  userRequestTemplate,
} from '../../../shared/email-templates';

export default factories.createCoreService('api::request.request', () => ({
  getTemplate(data: RequestModel): string {
    if (data.type === 'clinic') {
      return clinicRequestTemplate(data);
    }

    if (data.type === 'doctor') {
      return doctorRequestTemplate(data);
    }

    return simpleRequestTemplate(data);
  },

  async sendUserEmail(data: RequestModel) {
    const options: Mail.Options = {
      subject: `Заявка на запись LookForDocs`,
      html: userRequestTemplate(),
      from: 'lookfordooc@gmail.com',
      to: data.email,
    };

    try {
      transporter.sendMail(options);
    } catch (error) {
      console.log('An error occured while sending user email: ', error);
    }
  },

  async sendEmail(data: RequestModel) {
    const options: Mail.Options = {
      subject: `Заявка на запись LookForDocs`,
      html: this.getTemplate(data),
      from: 'lookfordooc@gmail.com',
      to: 'lookfordooc@gmail.com',
    };

    try {
      transporter.sendMail(options);
    } catch (error) {
      console.log('An error occured while sending email to admin: ', error);
    }
  },
}));

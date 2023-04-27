/**
 * partner-request service
 */

import { factories } from '@strapi/strapi';
import { PartnerRequestModel } from '../../../shared/models/partners-request.model';
import { transporter } from '../../../shared/assets';
import Mail from 'nodemailer/lib/mailer';
import {
  doctorPartnerTemplate,
  clinicPartnerTemplate,
} from '../../../shared/email-templates';

export default factories.createCoreService(
  'api::partner-request.partner-request',
  () => ({
    getTemplate(data: PartnerRequestModel): string {
      if (data.type === 'doctor') {
        return doctorPartnerTemplate(data);
      }

      return clinicPartnerTemplate(data);
    },

    async sendEmail(data: PartnerRequestModel) {
      const options: Mail.Options = {
        subject: `Заявка на партнерство LookForDocs`,
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
  }),
);

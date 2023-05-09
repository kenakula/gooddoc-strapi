/**
 * feedback service
 */

import { factories } from '@strapi/strapi';
import { FeedbackModel } from '../../../shared/models';
import Mail from 'nodemailer/lib/mailer';
import { feedbackTemplate } from '../../../shared/email-templates';
import { transporter } from '../../../shared/assets';

export default factories.createCoreService('api::feedback.feedback', () => ({
  async sendEmail(data: FeedbackModel) {
    const options: Mail.Options = {
      subject: `Форма обратной связи LookForDocs`,
      html: feedbackTemplate(data),
      from: 'lookfordooc@gmail.com',
      to: 'lookfordooc@gmail.com',
    };

    try {
      transporter.sendMail(options);
    } catch (error) {
      console.log('An error occured while sending testimonial email: ', error);
    }
  },
}));

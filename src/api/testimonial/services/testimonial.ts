import { factories } from '@strapi/strapi';
import Mail from 'nodemailer/lib/mailer';
import { TestimonialModel } from '../../../shared/models';
import { transporter } from '../../../shared/assets';
import { testimonialTemplate } from '../../../shared/email-templates/testimonial.template';

export default factories.createCoreService(
  'api::testimonial.testimonial',
  () => ({
    async sendEmail(data: TestimonialModel, dataId: number) {
      const options: Mail.Options = {
        subject: `Отзыв LookForDocs`,
        html: testimonialTemplate(data, dataId),
        from: 'lookfordooc@gmail.com',
        to: 'lookfordooc@gmail.com',
      };

      try {
        transporter.sendMail(options);
      } catch (error) {
        console.log(
          'An error occured while sending testimonial email: ',
          error,
        );
      }
    },
  }),
);

import { factories } from '@strapi/strapi';
import { TestimonialModel } from '../../../shared/models';
import { IEmailData } from '../../../shared/types';
import { transporter } from '../../../shared/assets';

export default factories.createCoreService('api::testimonial.testimonial', () => ({
  async sendEmail(data: IEmailData<TestimonialModel>) {
    try {
      transporter.sendMail(data.options);
    } catch (error) {
      console.log('An error occured: ', error)
    }
  }
}));

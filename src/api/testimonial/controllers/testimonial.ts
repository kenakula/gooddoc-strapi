import { factories } from '@strapi/strapi';
import { ResponseModel, TestimonialModel } from '../../../shared/models';

export default factories.createCoreController(
  'api::testimonial.testimonial',
  ({ strapi }) => ({
    async create(ctx) {
      const {
        data: { attributes },
      }: ResponseModel<TestimonialModel> = await super.create(ctx);

      try {
        await strapi
          .service('api::testimonial.testimonial')
          .sendEmail(attributes);
      } catch (err) {
        console.log('error email sending', err);
      }

      ctx.send({
        ok: true,
      });
    },
  }),
);

import { factories } from '@strapi/strapi';
import { ResponseModel, TestimonialModel } from '../../../shared/models';

export default factories.createCoreController(
  'api::testimonial.testimonial',
  ({ strapi }) => ({
    async create(ctx) {
      const {
        data: { attributes, id },
      }: ResponseModel<TestimonialModel> = await super.create(ctx);

      try {
        await strapi
          .service('api::testimonial.testimonial')
          .sendEmail(attributes, id);
      } catch (err) {
        console.log('error email sending', err);
      }

      ctx.send({
        ok: true,
      });
    },
  }),
);

/**
 * feedback controller
 */

import { factories } from '@strapi/strapi';
import { FeedbackModel, ResponseModel } from '../../../shared/models';

export default factories.createCoreController(
  'api::feedback.feedback',
  ({ strapi }) => ({
    async create(ctx) {
      const {
        data: { attributes },
      }: ResponseModel<FeedbackModel> = await super.create(ctx);

      try {
        await strapi.service('api::feedback.feedback').sendEmail(attributes);
      } catch (err) {
        console.log('error email sending', err);
      }

      ctx.send({
        ok: true,
      });
    },
  }),
);

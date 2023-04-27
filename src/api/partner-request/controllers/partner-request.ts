/**
 * partner-request controller
 */

import { factories } from '@strapi/strapi';
import { ResponseModel } from '../../../shared/models';
import { PartnerRequestModel } from '../../../shared/models/partners-request.model';

export default factories.createCoreController(
  'api::partner-request.partner-request',
  ({ strapi }) => ({
    async create(ctx) {
      const {
        data: { attributes },
      }: ResponseModel<PartnerRequestModel> = await super.create(ctx);

      try {
        await strapi
          .service('api::partner-request.partner-request')
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

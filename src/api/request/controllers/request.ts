import { factories } from '@strapi/strapi';
import { ResponseModel } from '../../../shared/models';
import { RequestModel } from '../../../shared/models/request.model';

// TODO сделать шаблоны писем
// 2 - пользователю когда записался с инфой о записи

export default factories.createCoreController(
  'api::request.request',
  ({ strapi }) => ({
    async create(ctx) {
      const {
        data: { attributes },
      }: ResponseModel<RequestModel> = await super.create(ctx);

      try {
        await strapi.service('api::request.request').sendEmail(attributes);
        await strapi.service('api::request.request').sendUserEmail(attributes);
      } catch (err) {
        console.log('error email sending', err);
      }

      ctx.send({
        ok: true,
      });
    },
  }),
);

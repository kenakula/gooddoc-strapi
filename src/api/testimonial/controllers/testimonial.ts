import { factories } from '@strapi/strapi'
import { ResponseModel, TestimonialModel } from '../../../shared/models';
import { IEmailData } from '../../../shared/types';

export default factories.createCoreController('api::testimonial.testimonial', ({ strapi }) => ({
  async create(ctx) {
    const { data: { id, attributes } }: ResponseModel<TestimonialModel> = await super.create(ctx);
    const testimonialURL = `https://api.lookfordocs.com/admin/content-manager/collectionType/api::testimonial.testimonial/${id}`;
    const testimonialTitle = attributes.type === 'clinic' ? 'Отзыв на клинику' : 'Отзыв на врача';

    const emailData: IEmailData<TestimonialModel> = {
      options: {
        subject: `${testimonialTitle} от пользователя ${attributes.author}`,
        html: `
        <h1>${testimonialTitle}</h1>
        <p>Пользователь ${attributes.author} отправил отзыв на ${attributes.type}.</p>
        <p>Рейтинг: <b>${attributes.rate} из 5</b></p>
        <h2>Текст отзыва</h2>
        <p>Почта пользователя: ${attributes.email}</p>
        <p>${attributes.comment} <b>${attributes.date}</b></p>
        <p>Ссылка на отзыв: <a href='${testimonialURL}'>Ссылка на отзыв</a></p><p>Чтобы отзыв появился на сайте, необходимо его опубликовать в админке</p>
      `,
        from: 'lookfordocs@strapi.com',
        to: 'lookfordooc@gmail.com',
      },
      data: attributes,
    }

    try {
      await strapi.service('api::testimonial.testimonial').sendEmail(emailData);
    } catch (err) {
      console.log('error email sending', err);
    }

    ctx.send({
      ok: true,
    });
  }
}));

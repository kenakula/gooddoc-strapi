import { factories } from '@strapi/strapi'

interface IPostResponse {
  data: {
    id: number;
    attributes: {
      id: string;
      date: string;
      type: 'clinic' | 'doctor';
      rate: number;
      comment: string;
      author: string;
      email: string;
      phone: string;
      clinic?: number[];
      doctor?: number[];
    }
  }
}

export default factories.createCoreController('api::testimonial.testimonial', ({ strapi }) => ({
  async create(ctx) {
    const { data: { id, attributes } }: IPostResponse = await super.create(ctx);
    console.log('attributes:', attributes)
    const testimonialURL = `api.lookfordocs.com/admin/content-manager/collectionType/api::testimonial.testimonial/${id}`;

    const testimonialTitle = attributes.type === 'clinic' ? 'Отзыв на клинику' : 'Отзыв на врача';

    const emailData = {
      subject: `${testimonialTitle} от пользователя ${attributes.author}`,
      html: `
        <h1>${testimonialTitle}</h1>
        <p>Пользователь ${attributes.author} отправл отзыв на ${attributes.type}.</p>
        <p>Рейтинг: <b>${attributes.rate} из 5</b></p>
        <h2>Текст отзыва</h2>
        <p>Почта пользователя: <a href="mailto:${attributes.email}>${attributes.email}</a></p>
        <p>${attributes.comment} <b>${attributes.date}</b></p>
        <p>Ссылка на отзыв: <a href='${testimonialURL}'>Ссылка на отзыв</a></p><p>Чтобы отзыв появился на сайте, необходимо его опубликовать в админке</p>`,
      from: 'lookfordocs@strapi.com',
      to: 'lookfordooc@gmail.com',
      testimonial: attributes,
      url: testimonialURL,
    };

    try {
      await strapi.service('api::testimonial.testimonial').sendEmail(emailData);
      console.log('email sent')
    } catch (err) {
      console.log('error email sending', err);
    }

    ctx.send({
      ok: true,
    });
  }
}));

import nodemailer from 'nodemailer';
import { factories } from '@strapi/strapi'
import Mail from 'nodemailer/lib/mailer';

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
    }
  }
}

export default factories.createCoreController('api::testimonial.testimonial', ({ strapi }) => ({
  async create(ctx) {
    const { data: { id, attributes } }: IPostResponse = await super.create(ctx);
    console.log('attributes:', attributes)
    const testimonialURL = `${strapi.config.url}/admin/content-manager/collectionType/api::testimonial.testimonial/${id}`;

    const emailTemplate = {
      subject: `Отзыв пользователя ${attributes.author}`,
      html: `<h1>Новый отзыв отправлен</h1><p>Пользователь ${attributes.author} отправл отзыв на ${attributes.type}.</p> <p>Рейтинг: <b>${attributes.rate}</b></p> <h2>Текст отзыва</h2><p>${attributes.comment} <br><b>${attributes.date}</b></p><p>Ссылка на отзыв: <a href='${testimonialURL}'>Ссылка на отзыв</a></p><p>Чтобы отзыв появился на сайте, необходимо его опубликовать в админке</p>`,
    };

    const mailOptions: Mail.Options = {
      from: 'api.lookfordocs@strapi.com',
      to: 'lookfordooc@gmail.com',
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    };

    try {
      await strapi.service('api::testimonial.testimonial').sendEmail(mailOptions);
      console.log('email sent')
    } catch (err) {
      console.log('error email sending', err);
    }

    ctx.send({
      ok: true,
    });
  }
}));

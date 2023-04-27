import { capitalizeName } from '../assets';
import { TestimonialModel } from '../models';

export const testimonialTemplate = (
  { entityName, author, type, rate, email, comment }: TestimonialModel,
  dataId: number,
): string => {
  const linkToTestimonial = `https://api.lookfordocs.com/admin/content-manager/collectionType/api::testimonial.testimonial/${dataId}`;
  const targetString =
    type === 'clinic' ? 'Отзыв на клинику' : 'Отзыв на врача';

  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Отзыв LookForDocs</title>

    </head>

    <body style="margin: 0;padding: 0;font-family: Arial, Helvetica, sans-serif;font-size: 16px;">
      <div class="container" style="padding: 20px;">
        <h1 style="font-size: 32px;text-align: center;">${targetString}</h1>
        <div><b>${capitalizeName(entityName)}</b></div>
        <h2 style="font-size: 28px;">Рейтинг: <span style="color: tomato;">${rate}</span> из 5</h2>
        <h2 style="font-size: 28px;">Отправитель:</h2>
        <table style="border: 1px solid black;border-collapse: collapse;">
          <tr>
            <td style="border: 1px solid black;padding: 5px 10px;">Имя</td>
            <td style="border: 1px solid black;padding: 5px 10px;">${author}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black;padding: 5px 10px;">email</td>
            <td style="border: 1px solid black;padding: 5px 10px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
        </table>
        <h2 style="font-size: 28px;">Комментарий</h2>
        <p>${comment}</p>

        <h3><a target="_blank" href="${linkToTestimonial}">Ссылка<a> на отзыв в CMS</h3>
        <span>Опубликуйте статью с отзывом чтобы она появилась на сайте</span>
      </div>
    </body>

    </html>
  `;
};

import { PartnerRequestModel } from '../models/partners-request.model';

export const doctorPartnerTemplate = ({
  name,
  email,
  phone,
  comment,
  specialty,
}: PartnerRequestModel): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Заявка LookForDocs</title>

    </head>

    <body style="margin: 0;padding: 0;font-family: Arial, Helvetica, sans-serif;font-size: 16px;">
      <div class="container" style="padding: 20px;">
        <h1 style="font-size: 32px;text-align: center;">Заявка на партнерство от врача</h1>
        <h2 style="font-size: 28px;">Отправитель:</h2>
        <table style="border: 1px solid black;border-collapse: collapse;">
          <tr>
            <td style="border: 1px solid black;padding: 5px 10px;">Имя</td>
            <td style="border: 1px solid black;padding: 5px 10px;">${name}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black;padding: 5px 10px;">Специальность</td>
            <td style="border: 1px solid black;padding: 5px 10px;">${specialty}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black;padding: 5px 10px;">Email</td>
            <td style="border: 1px solid black;padding: 5px 10px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="border: 1px solid black;padding: 5px 10px;">Телефон</td>
            <td style="border: 1px solid black;padding: 5px 10px;">${phone}</td>
          </tr>
        </table>
        <h2 style="font-size: 28px;">Комментарий</h2>
        <p>${comment}</p>
      </div>
    </body>

    </html>
  `;
};

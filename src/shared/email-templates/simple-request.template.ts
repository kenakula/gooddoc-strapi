import { getConnectByString } from '../assets';
import { RequestModel } from '../models/request.model';

export const simpleRequestTemplate = ({
  name,
  email,
  phone,
  connectionType,
  comment,
}: RequestModel): string => {
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
        <h1 style="font-size: 32px;text-align: center;">Заявка на запись</h1>
        <p>Это простая заявка, необходимо уточнение у пользователя</p>
        <h2 style="font-size: 28px;">Отправитель:</h2>
        <table style="border: 1px solid black;border-collapse: collapse;">
          <tr>
            <td style="border: 1px solid black;padding: 5px 10px;">Имя</td>
            <td style="border: 1px solid black;padding: 5px 10px;">${name}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black;padding: 5px 10px;">email</td>
            <td style="border: 1px solid black;padding: 5px 10px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="border: 1px solid black;padding: 5px 10px;">телефон</td>
            <td style="border: 1px solid black;padding: 5px 10px;">${phone}</td>
          </tr>
        </table>
        <h2 style="font-size: 28px;">Предпочтительный способ связи: </h2>
        <p><b>${getConnectByString(connectionType)}</b></p>
        <h2 style="font-size: 28px;">Комментарий</h2>
        <p>${comment}</p>
      </div>
    </body>

    </html>
  `;
};

import { getConnectByString, getDayString } from '../assets';
import { RequestModel } from '../models/request.model';

export const doctorRequestTemplate = ({
  entityName,
  name,
  email,
  phone,
  connectionType,
  comment,
  slot,
  isTelemed,
}: RequestModel): string => {
  const target = entityName
    ? `<h2 style="font-size: 28px;">Врач:</h2>
        <p><b>${entityName}</b></p>`
    : '<h2>Для уточнения связаться</h2>';

  const slotTime = slot
    ? `
      <h3>Время записи</h3>
      <p><b>${getDayString(new Date(slot), true)}</b></p>
    `
    : '';

  const telemedLabel = isTelemed
    ? '<div><b style="color: tomato;">телемедицина Реновация</b></div>'
    : '';

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
        <h1 style="font-size: 32px;text-align: center;">Заявка на запись к врачу</h1>
        ${target}
        ${slotTime}
        ${telemedLabel}
        <h2 style="font-size: 28px;">Отправитель:</h2>
        <table style="border: 1px solid black;border-collapse: collapse;">
          <tr>
            <td style="border: 1px solid black;padding: 5px 10px;">Имя</td>
            <td style="border: 1px solid black;padding: 5px 10px;">${name}</td>
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
        <h2 style="font-size: 28px;">Предпочтительный способ связи: </h2>
        <p><b>${getConnectByString(connectionType)}</b></p>
        <h2 style="font-size: 28px;">Комментарий</h2>
        <p>${comment}</p>
      </div>
    </body>

    </html>
  `;
};

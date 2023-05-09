import { capitalizeName } from '../assets';
import { FeedbackModel } from '../models';

export const feedbackTemplate = ({
  name,
  email,
  comment,
}: FeedbackModel): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Форма обратной связи LookForDocs</title>

    </head>

    <body style="margin: 0;padding: 0;font-family: Arial, Helvetica, sans-serif;font-size: 16px;">
      <div class="container" style="padding: 20px;">
        <h1 style="font-size: 28px;">Отправитель:${capitalizeName(name)}</h1>
        <table style="border: 1px solid black;border-collapse: collapse;">
          <tr>
            <td style="border: 1px solid black;padding: 5px 10px;">email</td>
            <td style="border: 1px solid black;padding: 5px 10px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
        </table>
        <h2 style="font-size: 28px;">Комментарий</h2>
        <p>${comment}</p>
      </div>
    </body>

    </html>
  `;
};

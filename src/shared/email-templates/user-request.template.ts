export const userRequestTemplate = (): string => {
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
        <h2 style="font-size: 28px;">Вы оставили заявку на сайте LookForDocs</h2>
        <p>В ближайшее время с вами свяжется администратор для уточнения деталей.</p>
      </div>
    </body>

    </html>
  `;
};

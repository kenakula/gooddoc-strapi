import { factories } from "@strapi/strapi";
import { ResponseModel } from "../../../shared/models";
import { RequestModel } from "../../../shared/models/request.model";
import { IEmailData } from "../../../shared/types";
import { getTimeString } from "../../../shared/assets";

export default factories.createCoreController(
  "api::request.request",
  ({ strapi }) => ({
    async create(ctx) {
      const {
        data: { id, attributes },
      }: ResponseModel<RequestModel> = await super.create(ctx);
      const requestURL = `https://api.lookfordocs.com/admin/content-manager/collectionType/api::request.request/${id}`;
      const requestTitle =
        attributes.type === "clinic"
          ? "Заявка на запись в клинику"
          : attributes.type === "doctor"
          ? "Заявка на запись к врачу"
          : "Заявка на запись";
      const requestConnectType =
        attributes.connectionType === "phone"
          ? "по телефону"
          : attributes.connectionType === "telegram"
          ? "в телеграм"
          : "в вотсапп";
      const appointmentTime = attributes.slot
        ? `<p>Время записи <b>${getTimeString(new Date(attributes.slot))}</b> - rnova</p>`
        : "";
      const requestDate = getTimeString(new Date(attributes.date));
      const targetName = attributes.entityName ?? "";

      const emailData: IEmailData<RequestModel> = {
        options: {
          subject: `${requestTitle}`,
          html: `
            <h1>${requestTitle} <b>${targetName}</b> от пользователя ${attributes.name}</h1>
            ${attributes.isTelemed ? '<h2>Онлайн консультация</h2>' : ''}
            <p>Пользователь ${attributes.name} отправил заявку на запись</p>
            ${appointmentTime}
            <p>Предпочитаемый способ связи: <b>${requestConnectType}</b></p>
            <p>Почта пользователя: ${attributes.email}</p>
            <p>Телефон пользователя: <a href="tel:${attributes.phone}">${attributes.phone}</a></p>
            <h2>Текст Заявки</h2>
            <p>${attributes.comment}</p>
            <b>Дата заявки: ${requestDate}</b>
            <p>Ссылка на заявку: <a href='${requestURL}'>Ссылка на заявку</a></p>
            <p>После обработки заявки переведите статью в состояние Published</p>
          `,
          from: "lookfordocs@strapi.com",
          to: "lookfordooc@gmail.com",
        },
        data: attributes,
      };

      try {
        await strapi.service("api::request.request").sendEmail(emailData);
      } catch (err) {
        console.log("error email sending", err);
      }

      ctx.send({
        ok: true,
      });
    },
  })
);

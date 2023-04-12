import Mail from "nodemailer/lib/mailer";

export interface IEmailData<T> {
  options: Mail.Options;
  data: T;
}

import { factories } from '@strapi/strapi';
import { IEmailData } from '../../../shared/types';
import { RequestModel } from '../../../shared/models/request.model';
import { transporter } from '../../../shared/assets';

export default factories.createCoreService('api::request.request', () => ({
  async sendEmail(data: IEmailData<RequestModel>) {
    try {
      transporter.sendMail(data.options);
    } catch (error) {
      console.log('An error occured: ', error)
    }
  }
}));

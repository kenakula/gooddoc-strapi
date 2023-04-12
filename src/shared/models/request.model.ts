export interface RequestModel {
  name: string;
  email: string;
  phone: string;
  connectionType: 'phone' | 'watsapp' | 'telegram';
  comment: string;
  type: 'doctor' | 'clinic' | undefined;
  clinic?: number[];
  doctor?: number[];
  date: Date;
}

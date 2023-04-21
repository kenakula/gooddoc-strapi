export interface SelectedSlot {
  start: Date;
  end: Date;
}

export interface RequestModel {
  name: string;
  email: string;
  phone: string;
  connectionType: "phone" | "watsapp" | "telegram";
  comment: string;
  type: "doctor" | "clinic" | undefined;
  clinic?: number[];
  doctor?: number[];
  entityName?: string;
  date: Date;
  isTelemed: boolean;
  slot?: Date;
}

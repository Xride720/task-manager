import { Task } from "@generated/graphql";

export const requiredArr: string[] = [

];
export type DescriptionFieldType = {
  key: keyof Task;
  title: string;
  type: 'date' | 'text';
};
export const taskDescriptionFields: DescriptionFieldType[] = [
  {
    key: 'creationDate',
    title: 'Дата создания',
    type: 'date'
  },
  {
    key: 'createdBy',
    title: 'Создал',
    type: 'text'
  },
  {
    key: 'modifidedDate',
    title: 'Дата изменения',
    type: 'date'
  },
  {
    key: 'modifidedBy',
    title: 'Изменил',
    type: 'text'
  },
];
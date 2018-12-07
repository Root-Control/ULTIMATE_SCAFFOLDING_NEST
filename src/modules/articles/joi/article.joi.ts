import { object, string, boolean, ObjectSchema } from 'joi';

export const articleSchema: ObjectSchema = object({
  title: string().required(),
  content: string().required()
});
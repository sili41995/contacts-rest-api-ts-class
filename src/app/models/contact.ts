import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { preUpdate, handleMongooseError } from './hooks';
import { RegExp, DefaultAvatarsURL, ErrorMessages } from '../constants';
import { IContact } from '../../types/types';

const { phoneRegExp, emailRegExp } = RegExp;

const { emailRegExpErr, phoneRegExpErr, phoneRequiredErr, nameRequiredErr } =
  ErrorMessages;

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: [true, nameRequiredErr] },
    phone: {
      type: String,
      match: [phoneRegExp, phoneRegExpErr],
      required: [true, phoneRequiredErr],
    },
    email: {
      type: String,
      match: [emailRegExp, emailRegExpErr],
    },
    role: String,
    description: String,
    tgUsername: String,
    favorite: { type: Boolean, default: false },
    avatar: {
      type: String,
      default: DefaultAvatarsURL.contact,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.pre('findOneAndUpdate', preUpdate);
contactSchema.post('save', handleMongooseError);
contactSchema.post('findOneAndUpdate', handleMongooseError);

const updateSchema = Joi.object()
  .min(1)
  .messages({ 'object.min': 'Missing fields' });
const updateStatusContactSchema = Joi.object()
  .keys({
    favorite: Joi.boolean(),
  })
  .messages({
    'object.unknown': 'An unexpected property was found in the object',
  });

const Contact = model<IContact>('contact', contactSchema);

export { Contact, updateSchema, updateStatusContactSchema };

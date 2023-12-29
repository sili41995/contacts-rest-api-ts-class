import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { IUser } from '../../types/types';
import { ErrorMessages, RegExp, DefaultAvatarsURL } from '../constants';
import { preUpdate, handleMongooseError } from './hooks';

const { phoneRegExp, emailRegExp, dateOfBirthRegExp } = RegExp;

const {
  emailRegExpErr,
  phoneRegExpErr,
  emailRequiredErr,
  passwordRequiredErr,
  passwordLengthErr,
  nameRequiredErr,
  dateOfBirthRegExpErr,
} = ErrorMessages;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, nameRequiredErr],
    },
    lastName: String,
    password: {
      type: String,
      required: [true, passwordRequiredErr],
    },
    email: {
      type: String,
      match: [emailRegExp, emailRegExpErr],
      required: [true, emailRequiredErr],
      unique: true,
    },
    phone: {
      type: String,
      match: [phoneRegExp, phoneRegExpErr],
    },
    location: String,
    dateOfBirth: {
      type: String,
      match: [dateOfBirthRegExp, dateOfBirthRegExpErr],
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: DefaultAvatarsURL.user,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', preUpdate);
userSchema.post('save', handleMongooseError);
userSchema.post('findOneAndUpdate', handleMongooseError);

const passwordSettings = Joi.string().min(6).required().messages({
  'any.required': passwordRequiredErr,
  'string.min': passwordLengthErr,
});
const emailSettings = Joi.string().pattern(emailRegExp).required().messages({
  'any.required': emailRequiredErr,
  'string.pattern.base': emailRegExpErr,
});

const signUpSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': nameRequiredErr }),
  lastName: Joi.string(),
  password: passwordSettings,
  email: emailSettings,
  phone: Joi.string().pattern(phoneRegExp).messages({
    'string.pattern.base': phoneRegExpErr,
  }),
  location: Joi.string(),
  dateOfBirth: Joi.string().pattern(dateOfBirthRegExp).messages({
    'string.pattern.base': dateOfBirthRegExpErr,
  }),
});
const signInSchema = Joi.object({
  password: passwordSettings,
  email: emailSettings,
});

const User = model<IUser>('user', userSchema);

export { User, signUpSchema, signInSchema };

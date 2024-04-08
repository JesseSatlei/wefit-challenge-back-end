import Joi from 'joi';
import { CreateUserDto, UserType } from '../dtos/CreateUserDto';

const brazilianPhoneRegex = /^(\([0-9]{2}\)\s)?(9)?[0-9]{4}-[0-9]{4}$/;
const brazilianPostalCodeRegex = /^\d{5}-\d{3}$/;
const brazilianCPFRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})$/;
const brazilianCNPJRegex = /^([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/;

const errorMessages = {
  required: '{#label} is required',
  email: 'Invalid email format',
  pattern: 'Invalid {#label} format',
  userType: 'User type must be one of LegalEntity or Individual',
  phone: 'Invalid Brazilian phone number format',
  postalCode: 'Invalid Brazilian ZIP code format',
};

export class ValidationService {
  static validateCreateUserDto(createUserDto: CreateUserDto) {
    const schema = Joi.object({
      userType: Joi.string()
        .valid(...Object.values(UserType))
        .required()
        .messages({ ...errorMessages, ...{ 'any.only': errorMessages.userType } }),
      document: Joi.string()
        .required()
        .pattern(createUserDto.userType === UserType.LegalEntity ? brazilianCNPJRegex : brazilianCPFRegex)
        .messages({ ...errorMessages, ...{ 'string.pattern.base': errorMessages.pattern } }),
      name: Joi.string().required().messages(errorMessages),
      cellphone: Joi.string().required().pattern(brazilianPhoneRegex).messages({ ...errorMessages, ...{ 'string.pattern.base': errorMessages.phone } }),
      telephone: Joi.string().required().pattern(brazilianPhoneRegex).messages({ ...errorMessages, ...{ 'string.pattern.base': errorMessages.phone } }),
      email: Joi.string().email().required().messages(errorMessages),
      postalCode: Joi.string().required().pattern(brazilianPostalCodeRegex).messages({ ...errorMessages, ...{ 'string.pattern.base': errorMessages.postalCode } }),
      street: Joi.string().required().messages(errorMessages),
      streetNumber: Joi.string().required().messages(errorMessages),
      complement: Joi.string().allow('').optional(),
      city: Joi.string().required().messages(errorMessages),
      neighborhood: Joi.string().required().messages(errorMessages),
      state: Joi.string().required().messages(errorMessages),
    });

    return schema.validate(createUserDto);
  }

  static validateUpdateUserDto(updateUserDto: Partial<CreateUserDto>) {
    const schema = Joi.object({
      userType: Joi.string()
        .valid(...Object.values(UserType))
        .optional()
        .messages({ 'any.only': errorMessages.userType }),
      document: Joi.string().pattern(updateUserDto.userType === UserType.LegalEntity ? brazilianCNPJRegex : brazilianCPFRegex).messages({ 'string.pattern.base': errorMessages.pattern }).optional(),
      name: Joi.string().optional(),
      cellphone: Joi.string().pattern(brazilianPhoneRegex).messages({ 'string.pattern.base': errorMessages.phone }).optional(),
      telephone: Joi.string().pattern(brazilianPhoneRegex).messages({ 'string.pattern.base': errorMessages.phone }).optional(),
      email: Joi.string().email().messages(errorMessages).optional(),
      postalCode: Joi.string().pattern(brazilianPostalCodeRegex).messages({ 'string.pattern.base': errorMessages.postalCode }).optional(),
      street: Joi.string().optional(),
      streetNumber: Joi.string().optional(),
      complement: Joi.string().allow('').optional(),
      city: Joi.string().optional(),
      neighborhood: Joi.string().optional(),
      state: Joi.string().optional(),
    });

    return schema.validate(updateUserDto);
  }
}

import { i18n } from "../lib/i18n";

export const loginValidationRules = {
  fullname: {
    required: i18n.t('input_validation.name_validation1'),
    pattern: {
      value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
      message: i18n.t('input_validation.name_validation2'),
    },
  },
  email: {
    required: i18n.t('input_validation.email_validation1'),
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: i18n.t('input_validation.email_validation2'),
    },
  },
  password: {
    required: i18n.t('input_validation.password_validation1'),
    minLength: {
      value: 6,
      message: i18n.t('input_validation.password_validation2'),
    },
  },
};

export const registerValidationRules = {
  name: {
    required: i18n.t('input_validation.name_validation1'),
    pattern: {
      value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
      message: i18n.t('input_validation.name_validation2'),
    },
  },
  email: {
    required: i18n.t('input_validation.email_validation1'),
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: i18n.t('input_validation.email_validation2'),
    },
  },
  password: {
    required: i18n.t('input_validation.password_validation1'),
    minLength: {
      value: 6,
      message: i18n.t('input_validation.password_validation2'),
    },
  },
}
import { i18n } from "../lib/i18n";

export const loginValidationRules = {
  email: {
    required: i18n.t('login.email_validation1'),
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: i18n.t('login.email_validation2'),
    },
  },
  password: {
    required: i18n.t('login.password_validation1'),
    minLength: {
      value: 6,
      message: i18n.t('login.password_validation2'),
    },
  },
};
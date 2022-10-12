/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-case-declarations */
/* eslint-disable no-continue */
import Validator from 'validator';

export const validate = (fields: any, validationRules: any) => {
  const errors: any = {};
  let isValid = true;
  validationRules.forEach((obj: any) => {
    const { field, validations } = obj;
    for (let i = 0; i < validations.length; i++) {
      const rule = validations[i].split(':');
      switch (rule[0]) {
        case 'numeric':
          if (!Validator.isEmpty(`${fields[field]}`) && !Validator.isNumeric(`${fields[field]}`)) {
            errors[field] = `${obj.name} must be numeric.`;
            isValid = false;
            continue;
          }
          break;
        case 'email':
          if (!Validator.isEmpty(`${fields[field]}`) && !Validator.isEmail(`${fields[field]}`)) {
            errors[field] = 'Please enter valid email address.';
            isValid = false;
            continue;
          }
          break;
        case 'digit':
          const numOfDigits = rule;
          let isLessOrGreater = false;
          if (rule.length === 3) {
            isLessOrGreater = true;
          }

          if (
            !Validator.isEmpty(`${fields[field]}`) &&
            !Validator.isLength(`${fields[field]}`, {
              min: isLessOrGreater ? Number(numOfDigits[1]) : Number(numOfDigits[1]),
              max: isLessOrGreater ? Number(numOfDigits[2]) : Number(numOfDigits[1])
            })
          ) {
            errors[field] = isLessOrGreater
              ? `${obj.name} must be between ${Number(numOfDigits[1])} and ${Number(
                  // eslint-disable-next-line prettier/prettier
                  numOfDigits[2]
                )} characters`
              : `${obj.name} must be of ${Number(numOfDigits[1])} digits.`;
            isValid = false;
            continue;
          }
          break;
        case 'password':
          if (!Validator.isEmpty(`${fields[field]}`)) {
            if (
              !Validator.isLength(`${fields[field]}`, { min: 8 }) ||
              !Validator.isLength(`${fields[field]}`, { max: 14 })
            ) {
              errors[field] = `${obj.name} must be between 8-14 characters.`;
              isValid = false;
              continue;
            }
            let pwd = new RegExp('^(?=.*[A-Z])');
            if (!pwd.test(`${fields[field]}`)) {
              errors[field] = `${obj.name} must contain one capital character`;
              isValid = false;
              continue;
            }
            pwd = new RegExp('^(?=.*[a-z])');
            if (!pwd.test(`${fields[field]}`)) {
              errors[field] = `${obj.name} must contain one small character`;
              isValid = false;
              continue;
            }
            pwd = new RegExp('^(?=.*[0-9])');
            if (!pwd.test(`${fields[field]}`)) {
              errors[field] = `${obj.name} must contain a digit`;
              isValid = false;
              continue;
            }
          }
          break;
        case 'confirm':
          if (!Validator.equals(`${fields[field]}`, `${fields[`${field}Confirm`]}`)) {
            errors[`${field}Confirm`] = `${obj.name} did not match`;
            isValid = false;
            continue;
          }
          break;
        case 'required':
        default:
          if (Validator.isEmpty(`${fields[field]}`) || !`${fields[field]}`.trim()) {
            errors[field] = `${obj.name} is required.`;
            isValid = false;
            continue;
          }
          break;
      }
    }
  });

  return { isValid, errors };
};

// import Validator from './Validator';
//
// export default new Validator();


// Currently using static methods of a class instead of creating an instance
// may be changed in the future based on needs.

import Validator from './Validator';
import { INPUT_STATUSES } from '../../utils/constants';

export const validate = (name, value) => {
  const isValid = Validator[name] ? Validator[name](value)
  // alert(`Validation for "${name}" is not supported!`)

  // default :  validate not empty
    : Validator.notEmptyInput(value);
  return isValid ? INPUT_STATUSES.VALID : INPUT_STATUSES.INVALID;
};

export const validateArr = (arr) => {
  const validResult = {};
  arr.forEach(item => {
    const isValid = Validator[item.name] ? Validator[item.name](item.value)
      : Validator.notEmptyInput(item.value);
    validResult[item.name] = isValid ? INPUT_STATUSES.VALID : INPUT_STATUSES.INVALID;
  });
  const confirmResult = validResult.confirmEmail;
  if (confirmResult && confirmResult.length) {
    const emailResult = validResult.email;
    if (emailResult && emailResult.length && emailResult === 'valid') {
      const emailArray = arr.filter(x => x.name === 'email');
      const confirmArray = arr.filter(x => x.name === 'confirmEmail');
      if (emailArray && emailArray.length && confirmArray && confirmArray.length) {
        const e = emailArray[0];
        const c = confirmArray[0];
        if (e.value && e.value.length && c.value && c.value.length && e.value === c.value) {
          validResult.confirmEmail = 'valid';
        } else {
          validResult.confirmEmail = 'invalid';
        }
      }
    }
  }
  return validResult;
};

// todo: add flow and jsDocks

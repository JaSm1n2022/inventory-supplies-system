import {
  emailValidator,
  phoneNumberValidator,
  passwordValidator,
  zipCodeUSValidator,
  notEmptyStringValidator
} from './validatorFunctions';

class Validator {
  // constructor () {
  // }

  static email(email) {
    return !!emailValidator(email);
  }

  static phone(phone) {
    return !!phoneNumberValidator(phone);
  }

  static name(name) {
    return notEmptyStringValidator(name);
  }

  static surname(surname) {
    return notEmptyStringValidator(surname);
  }

  // static role(role) {
  //   return notEmptyStringValidator(role);
  // }

  // static address(address) {
  //   return notEmptyStringValidator(address);
  // }

  static date(date) {
    // currently the date is picked by a datepicker, so date validation is just not to be empty
    return notEmptyStringValidator(date);
  }

  static password(password) {
    return !!passwordValidator(password);
  }

  static zip(zip) {
    return !!zipCodeUSValidator(zip);
  }

  static area(number) {
    return number >= 1;
  }

  static notEmptyInput(input) {
    return notEmptyStringValidator(input);
  }
}

export default Validator;

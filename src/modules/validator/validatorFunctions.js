const emailValidator = data => {
  // eslint-disable-next-line no-useless-escape
  const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(data);
};

const phoneNumberValidator = phone => {
  // eslint-disable-next-line no-useless-escape
  const regexp = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
  return regexp.test(phone);
};

// minimum eight characters, at least one uppercase letter, one lowercase letter and one number
const passwordValidator = password => {
  const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regexp.test(password);
};

// validates a US zip code based on both the five digit (12345)
// as well as nine-digit (12345-1234) schemes
const zipCodeUSValidator = data => {
  const regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
  return regexp.test(data);
};

const notEmptyStringValidator = data => !!(data && !(data.toString().trim().length < 1));

const minLengthValidator = (data, minLength) => {
  if (data && data.toString().trim().length < minLength) return false;
  return true;
};

export {
  emailValidator,
  phoneNumberValidator,
  passwordValidator,
  zipCodeUSValidator,
  notEmptyStringValidator,
  minLengthValidator
};

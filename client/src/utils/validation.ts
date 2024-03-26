export const validation = {
  required: (value: string) => !!value || "Field is required",
  spaces: (value: string) => !!value.trim() || "Field contains only spaces",
  text: (value: string) => {
    const isValidName = /^[a-zA-Zа-яА-Я\s]+$/gm.test(value);
    return isValidName || "Field must be text";
  },
  min2: (value: string) =>
    value.trim().length >= 2 || "Field must be at least 2 character",
  phone: (value: string) => {
    const isValidPhoneNumber = /^((\+7|7|8)+([0-9]){10})$/gm.test(value);
    return isValidPhoneNumber || "Wrong phone number";
  },
  email: (value: string) => {
    const isValidEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm.test(
        value
      );
    return isValidEmail || "Wrong email format";
  },
};

export const emailValidation = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm
);

export const phoneValidation = new RegExp(/^((\+7|7|8)+([0-9]){10})$/gm);

export const textValidation = new RegExp(/^[a-zA-Zа-яА-Я]+$/gm);

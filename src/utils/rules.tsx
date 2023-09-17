const commonMessage = {
    required : 'this is required',
    minlength: 'This is the minimum number of required',
    maxlength: 'This is the maximum number of required'
}
export const getRules = () => ({
  RequiredCoins: {
    required: {
      value: true,
      message: commonMessage.required,
    },
    maxLength: {
      value: 10,
      message: commonMessage.maxlength,
    },
    minLength: {
      value: 1,
      message: commonMessage.minlength,
    },
  },
  RequiredCoinsItem: {
    required: {
      value: true,
      message: commonMessage.required,
    },
  },
  season: {
    required: {
      value: true,
      message: commonMessage.required,
    },
    maxLength: {
      value: 100,
      message: commonMessage.maxlength,
    },
    minLength: {
      value: 5,
      message: commonMessage.minlength,
    },
  },
  numberOfMedal: {
    requied: {
      value: true,
      message: commonMessage.required,
    },
  },
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc',
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng',
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự',
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự',
    },
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc',
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự',
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự',
    },
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc',
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự',
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự',
    },
  },
});

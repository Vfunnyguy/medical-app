export var auth_img =
  'https://res.cloudinary.com/dygzt0i9k/image/upload/v1652685733/food-blog/TaeAugust11-removebg-preview_klyikm.png';
export var error_img = 'https://cloud.mongodb.com/static/images/sadface.gif';
export const copyText = (text) => {
  navigator.clipboard.writeText(text);
  window.alert('Coppied Text');
};

export const checkValid = (userData) => {
  const { fullName, address, phone, email, password } = userData;
  const warn = [];

  if (!fullName) {
    warn.push('Full Name is required');
  } else if (fullName.length > 20) {
    warn.push('Full Name is limited by  20 characters');
  }
  if (!address) {
    warn.push('Address is required');
  }
  if (!phone) {
    warn.push('Phone is required');
  } else if (phone.length !== 10 && phone.length > 10) {
    warn.push('Phone number is limited by 10 characters');
  }
  if (!email) {
    warn.push('Email is required');
  } else if (!checkEmail(email)) {
    warn.push('Email is invalid');
  }
  const msg = checkPassword(password);
  if (msg) warn.push(msg);
  return {
    errMsg: warn,
    errLength: warn.length,
  };
};

export const checkPass = (password) => {
  var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;
  if (!password.match(passRegex)) {
    return 'Mật khẩu phải có ít nhất 6 ký tự và phải có 1 số ,1 chữ in hoa và 1 ký tự đặc biệt';
  }
};
export const checkEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

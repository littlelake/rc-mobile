
"use strict";

class Validation {

  checkEmpty(val) {
    const reg = /\S/;
    return !reg.test(val) ? false : true;
  }

  checkPhone(val) {
    const reg = /^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/;
    return !reg.test(val) ? false : true;
  }

  checkPureNum(val) {
    let reg = /^[0-9]*$/;
    return !reg.test(val) ? false : true;
  }

  checkLengthEqual(val, len) {
    return val.length !== len ? false : true;
  }

  checkLength(val, min, max) {
    if(max === undefined) {
      return (val.length < min) ? false : true;
    }
    return (val.length < min || val.length > max) ? false : true;
  }

  formatThousandth(val) {
    let reg = /(\d)(?=(\d{3})+(?:\.\d+)?$)/g;
    if(!!val) {
      return val.replace(reg,'$1,');
    }else {
      return val;
    }
  }

  parseThousandth(val) {
    return val.replace(/,/g, '');
  }

  checkCardID(val) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return !reg.test(val) ? false : true;
  }
}

export default new Validation;

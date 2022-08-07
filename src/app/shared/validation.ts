import {FormControl, ValidatorFn, FormGroup, ValidationErrors, AbstractControl} from '@angular/forms';


export function validateEmail(c: FormControl) {
  let EMAIL_REGEXP = new RegExp('[^@]+@[^@]+\\.[^@]+');

  return EMAIL_REGEXP.test(c.value) || !c.value ? null : {
    validateEmail: {
      valid: false
    }
  };
}


export function validateDate(c: FormControl){
  let REGEXP = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;

  return REGEXP.test(c.value) || !c.value ? null : {
    validateDate: {
      valid: false
    }
  };
}


export function validateHasAtLeastOneLetter(c: FormControl){
  const REGEXP = new RegExp('^.*[a-zA-Z].*$');

  return REGEXP.test(c.value) || !c.value ? null : {
    validateHasAtLeastOneLetter: {
      valid: false
    }
  };
}

export function validateHasAtLeastOneCharacter(c: FormControl){
  const REGEXP = new RegExp('^.*\\S.*$');

  return REGEXP.test(c.value) || !c.value ? null : {
    validateHasAtLeastOneNumber: {
      valid: false
    }
  };
}


export function validateMSISDN(c: FormControl) {
  const REGEXP = new RegExp('^(\\+27\\d{9}?|0\\d{9}?)$');

  if (c.value) {
    const strippedValue = c.value.replace(/[^\d+]/g, '');
    return REGEXP.test(strippedValue) || !strippedValue ? null : {
      validateMSISDN: {
        valid: false
      }
    };
  } else {
    return REGEXP.test(c.value) || !c.value ? null : {
      validateMSISDN: {
        valid: false
      }
    };
  }
}

export function validateOptionalMSISDN(c: FormControl) {
  const REGEXP = new RegExp('^(\\+27\\d{9}?|0\\d{9}?)$');

  if (c.value) {
    const strippedValue = c.value.replace(/[^\d+]/g, '');
    return REGEXP.test(strippedValue) || !strippedValue ? null : {
      validateMSISDN: {
        valid: false
      }
    };
  }else {
    return true
  }
}


export function validateSAIDNumber(c: FormControl) {

  const REGEXP = new RegExp('^[0-9]{13}$');

  if (c.value) {
      let len = c.value.length,
          mul = 0,
          prodArr = [
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
              [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
          ],
          sum = 0;

      while (len--) {
          sum += prodArr[mul][parseInt(c.value.charAt(len), 10)];
          mul ^= 1;
      }
      return sum % 10 === 0 && sum > 0 && REGEXP.test(c.value) || !c.value ? null : {
          validateSAIDNumber: {
              valid: false
          }
      };
  }
  return false;
}

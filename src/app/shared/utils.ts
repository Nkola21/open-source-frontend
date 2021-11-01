import { FormControl } from '@angular/forms';


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



export function getErrorMessage(control) {
    if (control.errors.required)
      return 'Field is required';
    if (control.errors.maxlength)
      return `Max length of ${control.errors.maxlength.requiredLength} exceeded`;
    if (control.errors.minlength)
      return `Min length of ${control.errors.minlength.requiredLength}`;
    if (control.errors.validateEmail)
      return 'Not a valid email';
    if (control.errors.validateDate)
      return 'Enter a valid date';
    if (control.errors.validateConfirmPassword)
      return 'Does not match password.';
    if (control.errors.validateStatementReference)
      return 'Statement reference minimum 4 characters, maximum 20.';
    if (control.errors.validateMSISDN)
      return 'Please enter a valid cellphone number.';
    if (control.errors.confirm_password)
      return 'Passwords do not match';
    if (control.errors.min)
      return 'Value may not be less than 0';
    if (control.errors.custom)
      return `${control.errors.custom.message}`;
    return null;
  }

import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ConfirmPasswordValidation
{
    static validate(C: AbstractControl): ValidationErrors | null
    {
        const password = C.get('password');
        const confirm = C.get('confirmPassword');

        if (password.value !== confirm.value)
        {
            confirm.setErrors({matchPassword: true});
        }

        return null;
    }
}
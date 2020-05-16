import { FormControl, ValidationErrors } from '@angular/forms';

export class EmailValidation
{
    static validate(C: FormControl): ValidationErrors
    {
        const Regex = /^[a-zA-Z0-9.!#$%&\"*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;

        if (Regex.test(C.value))
        {
            return null;
        }
        else
        {
            return {
                email:
                {
                    valid: false
                }
            };
        }
    }
}
import { FormControl, ValidationErrors } from '@angular/forms';

export class NameValidation
{
    static validate(C: FormControl): ValidationErrors
    {
        const Regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/g;

        if (Regex.test(C.value))
        {
            return null;
        }
        else
        {
            return {
                name:
                {
                    valid: false
                }
            };
        }
    }
}
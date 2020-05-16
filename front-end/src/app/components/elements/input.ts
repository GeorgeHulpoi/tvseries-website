import { Component, forwardRef, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ValidationErrors } from '@angular/forms';

export abstract class TextFieldError
{
    protected abstract _errors: ValidationErrors;
    public errors: ValidationErrors;
    public abstract errorsCustom: {[key: string]: string};
    private errorsDefault: {[key: string]: string} =
    {
        required: 'This field is required.',
        pattern: 'The pattern is not valid.',
        email: 'The email is not valid.',
        minlength: 'The content must have minimum %% characters.',
        matchPassword: 'The passwords are not the same.',
        name: 'The username is not valid.',
    };

    constructor()
    {

    }

    /**
     * Formateaza textul
     *
     * @private
     * @param  {string} original
     * @param  {...any[]} args
     * @return string
     * @memberof TextFieldError
     */
    private formatText(original: string, ...args: any[]): string
    {
        let i = 0;

        return original.replace
        (
            /%%/g,
            (m: string): string  =>
            {
                return args[i++];
            }
        );
    }

    /**
     * Ia eroarea
     *
     * @readonly
     * @protected
     * @type (string | null)
     * @memberof TextFieldError
     */
    public get error(): string | null
    {
        const err = this.errors;

        if (err != null)
        {
            // Luam numele erori (required,pattern...)
            const key = Object.keys(err)[0];
            let text = null;

            // Luam eroarea (textul) din CustomErrors
            if (this.errorsCustom != null)
            {
                text = this.errorsCustom[key];
            }

            // Nu exista in CustomErrors, incercam in DefaultErrors
            if (text == undefined)
            {
                text = this.errorsDefault[key];
            }

            // Nu exista nici in DefaultErrors, returnam null..
            if (text == undefined)
            {
                return null;
            }

            // Dam format text unde e nevoie
            if (key === 'minlength')
            {
                return this.formatText(text, this.errors[key].requiredLength);
            }

            return text;
        }
        return null;
    }
}

@Component
({
    selector: 'a-input',
    templateUrl: '../../templates/elements/input.html',
    styleUrls:
    [
        '../../styles/elements/input.scss'
    ],
    providers:
    [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.Emulated,
})
export class InputComponent extends TextFieldError implements ControlValueAccessor, AfterViewInit
{
    private _value: string = '';
    private _type: string = 'text';
    private _disabled: boolean = false;
    private _loading: boolean = false;
    private _size: string;
    private _autocomplete: string;
    private _maxlength: number;
    private _pattern: string;
    protected _errors: ValidationErrors;

    private fnsToBeExecuted: Array<() => void> = [];

    @Input() counter: boolean = false;
    @Input() helper: string;
    @Input('errors-custom') errorsCustom: {[key: string]: string};
    @ViewChild('In', {static: true}) InputEl: ElementRef;

    get value(): string
    {
        return this._value;
    }

    set value(v: string)
    {
        this._value = v;
        this.onChangeCallback(v);
        this.CD.detectChanges();
    }

    get errors(): ValidationErrors
    {
        return this._errors;
    }

    @Input()
    set errors(value: ValidationErrors)
    {
        this._errors = value;
        this.CD.detectChanges();
    }

    public get type(): string
    {
        return this._type;
    }

    @Input()
    public set type(value: string)
    {
        this._type = value;

        const fn = () =>
        {
            if (value)
            {
                this.Renderer.setAttribute(this.InputEl.nativeElement, 'type', value);
            }
            else
            {
                this.Renderer.removeAttribute(this.InputEl.nativeElement, 'type');
            }
        };

        if (this.InputEl)
        {
            fn();
        }
        else
        {
            this.fnsToBeExecuted.push(fn);
        }
    }

    public get size(): string
    {
        return this._size;
    }

    @Input()
    public set size(value: string)
    {
        if (this.size)
        {
            this.Renderer.removeClass(this.element, this.size);
        }

        this._size = value;
        this.Renderer.addClass(this.element, this.size);
    }

    public get disabled(): boolean
    {
        return this._disabled;
    }

    @Input()
    public set disabled(value: boolean)
    {
        this._disabled = value;

        const fn = () =>
        {
            if (value)
            {
                this.Renderer.addClass(this.element, 'disabled');
                this.Renderer.setAttribute(this.InputEl.nativeElement, 'disabled', 'true');
            }
            else
            {
                this.Renderer.removeClass(this.element, 'disabled');
                this.Renderer.removeAttribute(this.InputEl.nativeElement, 'disabled');
            }
        };

        if (this.InputEl)
        {
            fn();
        }
        else
        {
            this.fnsToBeExecuted.push(fn);
        }
    }

    public get loading(): boolean
    {
        return this._loading;
    }

    public set loading(value: boolean)
    {
        this._loading = value;

        if (value)
        {
            this.Renderer.addClass(this.element, 'loading');
        }
        else
        {
            this.Renderer.removeClass(this.element, 'loading');
        }
    }

    public get autocomplete(): string
    {
        return this._autocomplete;
    }

    @Input()
    public set autocomplete(value: string)
    {
        this._autocomplete = value;

        const fn = () =>
        {
            if (value)
            {
                this.Renderer.setAttribute(this.InputEl.nativeElement, 'autocomplete', value);
            }
            else
            {
                this.Renderer.removeAttribute(this.InputEl.nativeElement, 'autocomplete');
            }
        };

        if (this.InputEl)
        {
            fn();
        }
        else
        {
            this.fnsToBeExecuted.push(fn);
        }
    }

    public get maxlength(): number
    {
        return this._maxlength;
    }

    @Input()
    public set maxlength(value: number)
    {
        this._maxlength = value;

        const fn = () =>
        {
            this.Renderer.setAttribute(this.InputEl.nativeElement, 'autocomplete', value.toString());
        };

        if (this.InputEl)
        {
            fn();
        }
        else
        {
            this.fnsToBeExecuted.push(fn);
        }
    }

    public get pattern(): string
    {
        return this._pattern;
    }

    @Input()
    public set pattern(value: string)
    {
        this._pattern = value;

        const fn = () =>
        {
            this.Renderer.setAttribute(this.InputEl.nativeElement, 'pattern', value);
        };

        if (this.InputEl)
        {
            fn();
        }
        else
        {
            this.fnsToBeExecuted.push(fn);
        }
    }

    public get element(): any
    {
        return this.Ref.nativeElement;
    }

    constructor(private CD: ChangeDetectorRef, private Renderer: Renderer2, private Ref: ElementRef)
    {
        super();
    }

    ngAfterViewInit()
    {
        this.CD.detach();

        this.size = 'normal';
        this.autocomplete = 'off';

        const len = this.fnsToBeExecuted.length;

        for (let i = 0; i < len; ++i)
        {
            this.fnsToBeExecuted[i]();
        }
    }

    // ControlValueAccessor
    onTouchedCallback: () => void = () => {};
    onChangeCallback: (_: any) => void = () => {};

    writeValue(v: any)
    {
        if (this.value !== v)
        {
            this.value = v;
            this.CD.detectChanges();
            this.onChangeCallback(v);
        }
    }

    registerOnChange(fn: any)
    {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any)
    {
        this.onTouchedCallback = fn;
    }

    setDisabledState(isDisabled: boolean)
    {
        this.disabled = isDisabled;
    }
    // ControlValueAccessor END

    public get isEmpty(): boolean
    {
        return (this.value === '');
    }

    public get valueCounter(): number
    {
        if (this.value)
        {
            return this.value.length;
        }
        return 0;
    }
}
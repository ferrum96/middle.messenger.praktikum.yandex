import './input.sass';
import input from './input.hbs?raw';
import Block from '../../utils/Block';
import { ValidatePattern } from '../../utils/ValidatePattern.ts';

interface InputProps {
  className?: string;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
  error?: string;
  events?: {};
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: () => this._handleBlur(),
        change: (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target) {
            this.props.value = target.value;
          }
        }
      }
    });
  }

  private _validate(value: string | undefined, pattern: ValidatePattern): void {
    const parentElement: HTMLElement | null = this.getContent().parentElement;
    const isValid: boolean = new RegExp(pattern).test(<string>value);

    if (!isValid) {
      parentElement?.classList.add(`${parentElement?.classList[0]}_invalid`);
      parentElement?.children?.item(2)?.classList.add('error-text_active');
    } else {
      parentElement?.classList.remove(`${parentElement?.classList[0]}_invalid`);
      parentElement?.children?.item(2)?.classList.remove('error-text_active');
    }
  }

  private _handleBlur(): void {
    const value = this.props.value?.trim();

    switch (this.props.name) {
      case 'email':
        this._validate(value, ValidatePattern.EmailPattern);
        break;
      case 'first_name':
        this._validate(value, ValidatePattern.NamePattern);
        break;
      case 'second_name':
        this._validate(value, ValidatePattern.NamePattern);
        break;
      case 'login':
        this._validate(value, ValidatePattern.LoginPattern);
        break;
      case 'password':
        this._validate(value, ValidatePattern.PasswordPattern);
        break;
      case 'oldPassword':
        this._validate(value, ValidatePattern.PasswordPattern);
        break;
      case 'newPassword':
        this._validate(value, ValidatePattern.PasswordPattern);
        break;
      case 'repeatNewPassword':
        this._validate(value, ValidatePattern.PasswordPattern);
        break;
      case 'phone':
        this._validate(value, ValidatePattern.PhonePattern);
        break;
    }
  }

  render() {
    return input;
  }
}

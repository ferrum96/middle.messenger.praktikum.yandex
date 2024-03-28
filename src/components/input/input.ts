import './input.sass';
import input from './input.hbs?raw';
import Block from '../../utils/Block';
import { ValidatePattern } from '../../utils/ValidatePattern.ts';

interface InputProps {
  className?: string;
  type?: string;
  name: string;
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

  public get value(): string {
    if (!this.props.value) {
      return '';
    }
    return this.props.value;
  }

  public get name(): string {
    return this.props.name;
  }

  private _validate(value: string | undefined, pattern: RegExp | string): void {
    const parentElement: HTMLElement | null = this.getContent().parentElement;

    const isValid: boolean =
      typeof pattern === 'object'
        ? new RegExp(pattern).test(<string>value)
        : pattern === value;

    if (!isValid) {
      parentElement?.classList.add(`${parentElement?.classList[1]}_invalid`);
      parentElement?.children
        ?.item(2)
        ?.classList.add('input-field__error-text_active');
    } else {
      parentElement?.classList.remove(`${parentElement?.classList[1]}_invalid`);
      parentElement?.children
        ?.item(2)
        ?.classList.remove('input-field__error-text_active');
    }
  }

  private _handleBlur(): void {
    const value = this.value?.trim();
    const passwordInput = document.querySelector(
      'input[name="password"], input[name="new_password"]'
    );
    const passwordValue = passwordInput
      ? (passwordInput as HTMLInputElement).value
      : '';

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
      case 'display_name':
        this._validate(value, ValidatePattern.LoginPattern);
        break;
      case 'password':
      case 'old_password':
      case 'new_password':
        this._validate(value, ValidatePattern.PasswordPattern);
        break;
      case 'repeat_password':
        this._validate(value, passwordValue);
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

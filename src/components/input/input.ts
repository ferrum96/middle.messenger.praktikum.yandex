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
  icon?: string;
  events?: {};
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({
      ...props,
      value: props.value,
      events: {
        change: (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target) {
            this.setProps({
              value: target.value
            });
          }
        },
        blur: () => {
          this._setState();
          if (this.value !== '' && this.name === 'search') {
            this.getContent().focus();
          }
        }
      }
    });
  }

  public get value(): string {
    if (this.props.value !== undefined && this.props.value !== null) {
      return this.props.value;
    }
    return '';
  }

  public get name(): string {
    if (this.props.name !== undefined && this.props.name !== null) {
      return this.props.name;
    }
    return '';
  }

  private _validate(value: string, pattern: RegExp | string): boolean {
    return typeof pattern === 'object'
      ? new RegExp(pattern).test(value)
      : pattern === value;
  }

  componentDidUpdate(_oldProps: InputProps, newProps: InputProps): boolean {
    return this.value !== newProps.value;
  }

  public get isValid(): boolean {
    const value = this.value.trim();
    const passwordInput = document.querySelector(
      'input[name="password"], input[name="new_password"]'
    );
    const passwordValue = passwordInput
      ? (passwordInput as HTMLInputElement).value
      : '';

    switch (this.props.name) {
      case 'email':
        return this._validate(value, ValidatePattern.EmailPattern);
      case 'first_name':
        return this._validate(value, ValidatePattern.NamePattern);
      case 'second_name':
        return this._validate(value, ValidatePattern.NamePattern);
      case 'login':
      case 'display_name':
        return this._validate(value, ValidatePattern.LoginPattern);
      case 'password':
      case 'old_password':
      case 'new_password':
        return this._validate(value, ValidatePattern.PasswordPattern);
      case 'repeat_password':
        return this._validate(value, passwordValue);
      case 'phone':
        return this._validate(value, ValidatePattern.PhonePattern);
      default:
        return true;
    }
  }

  private _setState(): void {
    const parentElement = this.getContent().parentElement;

    if (!this.isValid) {
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

  render() {
    return input;
  }
}

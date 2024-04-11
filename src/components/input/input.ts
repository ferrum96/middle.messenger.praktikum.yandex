import './input.sass';
import inputTemplate from './input.hbs?raw';
import Block from '../../utils/Block';
import { ValidatePattern } from '../../utils/ValidatePattern.ts';

interface InputProps {
  className?: string;
  type?: string;
  name?: string;
  value?: string | null;
  placeholder?: string;
  readonly?: boolean;
  events?: {};
}

export default class Input extends Block {
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
          this._onSearchFocus();
          this._setErrorState();
        }
      }
    });
  }

  componentDidUpdate(oldProps: InputProps, newProps: InputProps): boolean {
    this._setErrorState();
    return super.componentDidUpdate(oldProps, newProps);
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

  public clearInput(): void {
    this.setProps({
      value: ''
    });
  }

  private _validate(value: string, pattern: RegExp | string): boolean {
    return typeof pattern === 'object'
      ? new RegExp(pattern).test(value)
      : pattern === value;
  }

  private _onSearchFocus() {
    if (this.value !== '' && this.name === 'search') {
      this.getContent().focus();
    }
  }

  public get isValid(): boolean {
    const value = this.value.trim();
    const passwordInput = document.querySelector(
      'input[name="password"], input[name="newPassword"]'
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
      case 'oldPassword':
      case 'newPassword':
        return this._validate(value, ValidatePattern.PasswordPattern);
      case 'repeatPassword':
        return this._validate(value, passwordValue);
      case 'phone':
        return this._validate(value, ValidatePattern.PhonePattern);
      default:
        return true;
    }
  }

  private _setErrorState(): void {
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
    return inputTemplate;
  }
}

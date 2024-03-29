import './input-field.sass';
import Block from '../../utils/Block';
import inputField from './input-field.hbs?raw';
import './input-field.sass';
import Input from '../input/input.ts';

interface InputFieldProps {
  className?: string;
  title?: string;
  value?: string;
  name?: string;
  input?: Input;
  error?: string;
  isValid?: boolean;
  events?: {};
}

export default class InputField extends Block<InputFieldProps> {
  constructor(props: InputFieldProps) {
    super({
      ...props,
      name: props?.input?.name,
      isValid: props?.input?.isValid,
      events: {
        change: () => {
          if (props.input) {
            this.setProps({ value: props.input.value });
          }
        }
      }
    });

    if (!props.input) {
      this.props.input = new Input({});
    }
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

  public get isValid(): boolean {
    console.log(`isValid  ${this.props.isValid}`);
    return <boolean>this.props.isValid;
  }

  render() {
    return inputField;
  }
}

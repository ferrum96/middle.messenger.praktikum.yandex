import './input-field.sass';
import Block from '../../utils/Block';
import inputField from './input-field.hbs?raw';
import Input from '../input/input';
import './input-field.sass';

interface InputFieldProps {
  className?: string;
  title: string;
  input: Input;
  error?: string;
  events?: {};
}

export default class InputField extends Block<InputFieldProps> {
  constructor(props: InputFieldProps) {
    super({
      ...props
    });
  }

  render() {
    return inputField;
  }

  acs() {
    this.props.input.setProps({ error: this.props.error });
  }
}

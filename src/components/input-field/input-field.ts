import './input-field.sass';
import Block from '../../utils/Block';
import inputField from './input-field.hbs?raw';
import './input-field.sass';
import Input from '../input/input.ts';

interface InputFieldProps {
  className?: string;
  title?: string;
  input?: Input;
  error?: string;
  events?: {};
  onChange?: () => void;
}

export default class InputField extends Block {
  constructor(props: InputFieldProps) {
    super({
      ...props
    });
  }

  render() {
    return inputField;
  }
}

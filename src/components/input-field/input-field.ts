import './input-field.sass';
import Block from '../../core/Block.ts';
import inputFieldTemplate from './input-field.hbs?raw';
import './input-field.sass';
import Input from '../input/input.ts';

interface InputFieldProps {
  className?: string;
  title?: string;
  input?: Input;
  error?: string;
  events?: {};
}

export default class InputField extends Block {
  constructor(props: InputFieldProps) {
    super({
      ...props
    });
  }

  render() {
    return inputFieldTemplate;
  }
}

import './form.sass';
import form from './form.hbs?raw';
import Block from '../../utils/Block';
import Button from '../button/button.ts';
import InputField from '../input-field/input-field.ts';
import Link from '../link/link.ts';

interface FormProps {
  formTitle: string;
  inputFields: InputField[];
  submitButton: Button;
  alternativeLink: Link;
}

export default class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super({
      ...props
    });
  }

  render() {
    return form;
  }
}

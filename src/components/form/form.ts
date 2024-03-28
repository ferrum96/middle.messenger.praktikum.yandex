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
  events?: {};
}

export default class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        // click: (event: Event) => this.handleSubmit(event)
      }
    });
  }

  // handleSubmit(event: Event): void {
  //   event.preventDefault(); // Отменяем стандартное действие отправки формы
  //
  //   const formData: InputField[] = this.children['inputFields'] as InputField[];
  //   const formValues: Record<string, string> = {};
  //
  //   formData.forEach(inputField => {
  //     console.log(inputField.getValue());
  //   });
  //
  //   console.log(formValues);
  // }

  render() {
    return form;
  }
}

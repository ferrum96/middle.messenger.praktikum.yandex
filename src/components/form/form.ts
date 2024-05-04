import './form.sass';
import formTemplate from './form.hbs?raw';
import Block from '../../core/Block.ts';
import Button from '../button/button.ts';
import InputField from '../input-field/input-field.ts';
import Link from '../link/link.ts';
import { EventHandlers } from '../../utils/EventHandlers.ts';
import validateForm from '../../utils/validateForm.ts';
import { getFormData } from '../../utils/getFormData.ts';
import store from '../../core/Store.ts';

interface FormProps {
  formTitle: string;
  inputFields: InputField[];
  submitButton: Button;
  alternativeLink: Link;
  events?: {};
  onSubmit?: (event?: Event | undefined) => void;
}

export default class Form extends Block {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: (event: Event) => {
          store.set('formData', getFormData(this));
          if (props.onSubmit && validateForm(this)) {
            props.onSubmit(event);
          }
          EventHandlers.sendFormData(event, this);
        }
      }
    });
  }

  render() {
    return formTemplate;
  }
}

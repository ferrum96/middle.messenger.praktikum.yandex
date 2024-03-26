import './edit-text-field.sass';
import Input from '../input/input';
import Block from '../../utils/Block';
import './edit-text-field.sass';
import editTextField from './edit-text-field.hbs?raw';
import { ErrorText } from '../../utils/validateField.ts';

interface EditTextFieldProps {
  className?: string;
  title: string;
  input: Input;
  error?: ErrorText;
}

export default class EditTextField extends Block<EditTextFieldProps> {
  constructor(props: EditTextFieldProps) {
    super({
      ...props
    });
  }

  render() {
    return editTextField;
  }
}

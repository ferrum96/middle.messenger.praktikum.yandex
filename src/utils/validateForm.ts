import Block from './Block.ts';
import InputField from '../components/input-field/input-field.ts';
import Input from '../components/input/input.ts';

export default function validateForm(form: Block): boolean {
  const formData: InputField[] = form.children['inputFields'] as InputField[];
  const isValidValues: boolean[] = [];

  formData.forEach(inputField => {
    const input = inputField.children['input'] as Input;
    isValidValues.push(input.isValid);
    if (!input.isValid) {
      inputField
        .getContent()
        .classList.add(`${inputField.getContent().classList[1]}_invalid`);
      inputField
        .getContent()
        .children.item(2)
        ?.classList.add('input-field__error-text_active');
    } else {
      inputField
        .getContent()
        .classList.remove(`${inputField.getContent().classList[1]}_invalid`);
      inputField
        .getContent()
        .children.item(2)
        ?.classList.remove('input-field__error-text_active');
    }
  });

  return !isValidValues.some(isValid => !isValid);
}

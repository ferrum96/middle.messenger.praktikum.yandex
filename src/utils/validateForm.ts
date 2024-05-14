import Block from '../core/block/Block.ts';
import InputField from '../components/input-field/input-field.ts';
import Input from '../components/input/input.ts';

export default function validateForm(form: Block): boolean {
  const formData: InputField[] = form.children['inputFields'] as InputField[];
  const isValidValues: boolean[] = [];

  formData.forEach(inputField => {
    const input = inputField.children['input'] as Input;
    isValidValues.push(input.isValid);
  });

  return !isValidValues.some(isValid => !isValid);
}

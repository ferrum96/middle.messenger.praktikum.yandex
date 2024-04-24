import InputField from '../components/input-field/input-field.ts';
import Block from './Block.ts';
import Input from '../components/input/input.ts';

export function getFormData(form: Block): {} {
  const formData = form.children['inputFields'] as InputField[];
  const formValues: Record<string, string> = {};

  formData.forEach(inputField => {
    const input = inputField.children['input'] as Input;
    formValues[input.name] = input.value;
  });

  return formValues;
}

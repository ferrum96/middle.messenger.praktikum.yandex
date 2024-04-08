import InputField from '../components/input-field/input-field.ts';
import Block from './Block.ts';

export default function getFormData(form: Block): {} {
  const formData = form.children['inputFields'] as InputField[];
  const formValues: Record<string, string> = {};

  formData.forEach(inputField => {
    formValues[inputField.name] = inputField.value;
  });

  return formValues;
}

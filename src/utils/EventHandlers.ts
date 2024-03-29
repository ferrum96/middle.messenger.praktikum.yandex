import InputField from '../components/input-field/input-field.ts';
import Block from './Block.ts';

export class EventHandlers {
  public static onClickRoute(event: Event): void {
    if (event.target instanceof Element) {
      const pageAttribute = event.target.getAttribute('page') as string | null;
      if (pageAttribute !== null) {
        window.location.href = pageAttribute;
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
  }

  public static sendFormData(event: Event, form: Block): void {
    event.preventDefault();

    const formData = form.children['inputFields'] as InputField[];
    const formValues: Record<string, string> = {};

    formData.forEach(inputField => {
      formValues[inputField.name] = inputField.value;
    });

    console.log(formValues);
  }

  public static validateForm(form: Block): void {
    const formData = form.children['inputFields'] as InputField[];

    formData.forEach(inputField => {
      if (!inputField.isValid) {
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
  }
}

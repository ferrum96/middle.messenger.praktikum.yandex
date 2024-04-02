import InputField from '../components/input-field/input-field.ts';
import Block from './Block.ts';
import Router from './Router.ts';

export class EventHandlers {
  public static onClickRoute(event: Event): void {
    const router = new Router();

    if (event.target instanceof Element) {
      const pageAttribute = event.target.getAttribute('page') as string | null;
      if (pageAttribute !== null) {
        router.go(pageAttribute);
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
}

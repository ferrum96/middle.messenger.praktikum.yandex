import Block from './Block.ts';
import router from './Router.ts';
import getFormData from './getFormData.ts';

export class EventHandlers {
  public static onClickRoute(event: Event): void {
    if (event.target instanceof Element) {
      const pageAttribute = event.target.getAttribute('page') as string | null;

      if (pageAttribute !== null) {
        router.go(pageAttribute);
        event.preventDefault();
      }
    }
  }

  public static sendFormData(event: Event, form: Block): void {
    event.preventDefault();
    console.log(getFormData(form));
  }
}

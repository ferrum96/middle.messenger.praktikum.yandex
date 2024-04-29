import Block from '../core/Block.ts';
import router from '../core/Router.ts';
import { getFormData } from './getFormData.ts';

export class EventHandlers {
  public static onClickRoute(event: Event): void {
    if (event.target instanceof Element) {
      const pageAttribute = event.target.getAttribute('page') as string | null;

      if (pageAttribute !== null) {
        event.preventDefault();
        router.go(pageAttribute);
      }
    }
  }

  public static sendFormData(event: Event, form: Block): void {
    event.preventDefault();
    console.log(getFormData(form));
  }

  public static setModalWindowActive(selector: string) {
    const modalWindow = document.querySelector(selector);
    if (modalWindow !== null) {
      modalWindow.classList.add('modal-window_active');
    }
  }

  public static setActiveItem(chatId: number, selector: string) {
    const chatListItems = document.querySelectorAll(selector);

    chatListItems.forEach(item => {
      item.classList.remove(`${item.classList[0]}_active`);
    });

    const activeChatListItem = [...chatListItems].filter(
      item => Number(item.getAttribute('id')) === chatId
    );

    activeChatListItem[0].classList.add(
      `${activeChatListItem[0].classList[0]}_active`
    );
  }
}

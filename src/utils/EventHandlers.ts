import Block from '../core/block/Block.ts';
import router from '../core/router/Router.ts';
import { getFormData } from './getFormData.ts';
import store from '../core/store/Store.ts';

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

  public static onChangeAvatar(event?: Event) {
    if (event === undefined) return;
    event.preventDefault();

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.addEventListener('change', async event => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append('avatar', files[0]);
        store.set('fileName', files[0].name);
        store.set('isLoadedFile', true);
        store.set('formData', formData);
      }
    });

    fileInput.click();
  }
}

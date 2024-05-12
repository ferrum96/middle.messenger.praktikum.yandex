import PanelBack from '../panel-back/panel-back.ts';
import Block from '../../core/block/Block.ts';
import ModalWindow from '../modal-window/modal-window.ts';
import Link from '../link/link.ts';
import Button from '../button/button.ts';
import usersController from '../../controllers/users-controller.ts';
import { hoc } from '../../core/hoc.ts';
import store, { State } from '../../core/store/Store.ts';
import { ProfileForm } from '../profile-form/profile-form.ts';

export interface ProfileComponentProps {
  modalWindow?: ModalWindow;
  panelBack?: PanelBack;
  profileForm: ProfileForm;
}

// language=hbs
const profileComponentTemplate = `
    <div class="profile-component">
        {{{modalWindow}}}
        {{{panelBack}}}
        {{{profileForm}}}
    </div>
`;

export class ProfileComponent extends Block {
  constructor({ profileForm }: ProfileComponentProps) {
    super({
      panelBack: new PanelBack(),
      modalWindow: new ModalWindow({
        className: 'modal-window_upload-avatar',
        title: 'Загрузите файл',
        fileName: '',
        content: [
          new Link({
            text: 'Выбрать файл на компьютере',
            onClick: (event?: Event) => this._onChangeAvatar(event)
          })
        ],
        actionButton: new Button({
          className: 'modal-window__action-button',
          text: 'Поменять',
          onClick: () => {
            usersController.changeAvatar(store.getState().formData as FormData);
          }
        })
      }),
      profileForm
    });
  }

  componentDidUpdate(
    oldProps: ProfileComponentProps,
    newProps: ProfileComponentProps
  ): boolean {
    (this.children.modalWindow as ModalWindow).setProps({
      title: store.getState().isLoadedFile ? 'Файл загружен' : 'Загрузите файл',
      fileName: store.getState().fileName
    });

    (this.children.modalWindow as ModalWindow)
      .getContent()
      .classList.add('modal-window_active');

    return super.componentDidUpdate(oldProps, newProps);
  }

  private _onChangeAvatar(event?: Event) {
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

  render() {
    return profileComponentTemplate;
  }
}

export const profileComponent = hoc(
  state =>
    ({
      isLoadedFile: state.isLoadedFile,
      fileName: state.fileName
    }) as State
)(ProfileComponent);

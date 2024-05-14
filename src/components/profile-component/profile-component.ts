import PanelBack from '../panel-back/panel-back.ts';
import Block from '../../core/block/Block.ts';
import ModalWindow from '../modal-window/modal-window.ts';
import Link from '../link/link.ts';
import Button from '../button/button.ts';
import usersController from '../../controllers/users-controller.ts';
import { hoc } from '../../core/hoc.ts';
import store, { State } from '../../core/store/Store.ts';
import { ProfileForm } from '../profile-form/profile-form.ts';
import { EventHandlers } from '../../utils/EventHandlers.ts';

export interface ProfileComponentProps {
  uploadAvatarModalWindow?: ModalWindow;
  panelBack?: PanelBack;
  profileForm: ProfileForm;
}

// language=hbs
const profileComponentTemplate = `
    <div class="profile-component">
        {{{uploadAvatarModalWindow}}}
        {{{panelBack}}}
        {{{profileForm}}}
    </div>
`;

export class ProfileComponent extends Block {
  constructor({ profileForm }: ProfileComponentProps) {
    super({
      panelBack: new PanelBack(),
      uploadAvatarModalWindow: new ModalWindow({
        className: 'modal-window_upload-avatar',
        title: 'Загрузите файл',
        fileName: '',
        content: [
          new Link({
            text: 'Выбрать файл на компьютере',
            onClick: (event?: Event) => EventHandlers.onChangeAvatar(event)
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
    (this.children.uploadAvatarModalWindow as ModalWindow).setProps({
      title: store.getState().isLoadedFile ? 'Файл загружен' : 'Загрузите файл',
      fileName: store.getState().fileName
    });

    (this.children.uploadAvatarModalWindow as ModalWindow)
      .getContent()
      .classList.add('modal-window_active');

    return super.componentDidUpdate(oldProps, newProps);
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

import './profile-form.sass';
import profileFormTemplate from './profile-form.hbs?raw';
import Button from '../button/button';
import Block from '../../utils/Block';
import Avatar from '../avatar/avatar';
import Link from '../link/link';
import InputField from '../input-field/input-field.ts';
import { EventHandlers } from '../../utils/EventHandlers.ts';
import validateForm from '../../utils/validateForm.ts';
import { getFormData } from '../../utils/getFormData.ts';
import store from '../../utils/Store.ts';
import { hoc } from '../../utils/hoc.ts';
import Input from '../input/input.ts';
import { buildPathToResource } from '../../utils/buildPathToResource.ts';
import { User } from '../../utils/types.ts';

interface ProfileFormProps {
  avatar: Avatar;
  userName?: string;
  inputFields: InputField[];
  controlPanel?: Link[] | Button[];
  events?: {};
  onSubmit?: (event?: Event | undefined) => void;
}

export class ProfileForm extends Block {
  constructor(props: ProfileFormProps) {
    super({
      ...props,
      events: {
        submit: (event: Event) => {
          store.set('formData', getFormData(this));
          if (props.onSubmit && validateForm(this)) {
            props.onSubmit(event);
          }
          EventHandlers.sendFormData(event, this);
        }
      }
    });
  }

  componentDidMount() {
    const user = store.getState().user;
    const children = this.children;
    const avatar = children.avatar as Avatar;
    const inputs = Object.values(children.inputFields as InputField[]).map(
      inputField => {
        return inputField.children.input as Input;
      }
    );
    this.setProps({
      userName: user ? `${user.first_name} ${user.second_name}` : ''
    });

    avatar.setProps({
      src:
        store.getState().user?.avatar !== null
          ? buildPathToResource(store.getState().user?.avatar ?? '')
          : 'assets/icons/Default-avatar.svg',
      alt: `${store.getState().user?.id}` ?? '',
      events: {
        click: () =>
          EventHandlers.setModalWindowActive('.modal-window_upload-avatar')
      }
    });

    inputs.forEach(input => {
      input.setProps({ value: user ? user[input.name as keyof User] : '' });
    });

    super.componentDidMount();
  }

  render() {
    return profileFormTemplate;
  }
}

export const profileForm = hoc(state => ({
  user: state.user
}))(ProfileForm);

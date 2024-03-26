import './profile-form.sass';
import profileForm from './profile-form.hbs?raw';
import Button from '../button/button';
import Block from '../../utils/Block';
import Avatar from '../avatar/avatar';
import EditTextField from '../edit-text-field/edit-text-field';
import Link from '../link/link';

interface ProfileFormProps {
  avatar: Avatar;
  userName?: string;
  emailEditTextField?: EditTextField;
  loginEditTextField?: EditTextField;
  firstNameEditTextField?: EditTextField;
  secondNameEditTextField?: EditTextField;
  displayNameEditTextField?: EditTextField;
  phoneEditTextField?: EditTextField;
  oldPasswordTextField?: EditTextField;
  newPasswordEditTextField?: EditTextField;
  repeatNewPasswordEditTextField?: EditTextField;
  editProfileLink?: Link;
  editPasswordLink?: Link;
  logoutLink?: Link;
  saveProfileButton?: Button;
}

export default class ProfileForm extends Block<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    super({ ...props });
  }

  render() {
    return profileForm;
  }
}

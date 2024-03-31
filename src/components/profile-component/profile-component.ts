import './profile-component.sass';
import profileComponent from './profile-component.hbs?raw';
import PanelBack from '../panel-back/panel-back';
import ProfileForm from '../profile-form/profile-form';

import Block from '../../utils/Block';

interface ProfileComponentProps {
  panelBack?: PanelBack;
  profileForm: ProfileForm;
}

export default abstract class ProfileComponent extends Block<ProfileComponentProps> {
  protected constructor(props: ProfileComponentProps) {
    super({
      panelBack: new PanelBack(),
      ...props
    });
  }

  render() {
    return profileComponent;
  }
}

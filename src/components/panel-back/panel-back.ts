import './panel-back.sass';
import Block from '../../utils/Block';
import panelBack from './panel-back.hbs?raw';
import Button from '../button/button';

interface PanelBackProps {
  backButton: Button;
}

export default class PanelBack extends Block<PanelBackProps> {
  constructor() {
    super({
      backButton: new Button({
        className: 'button_round',
        text: '←',
        page: '/chats'
      })
    });
  }

  render() {
    return panelBack;
  }
}

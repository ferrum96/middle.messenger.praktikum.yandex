import './panel-back.sass';
import Block from '../../utils/Block';
import panelBack from './panel-back.hbs?raw';
import Button from '../button/button';

interface PanelBackProps {
  backButton: Button;
}

export default class PanelBack extends Block {
  constructor() {
    const props: PanelBackProps = {
      backButton: new Button({
        className: 'button_round',
        icon: 'assets/icons/Left-arrow.svg',
        page: '/messenger'
      })
    };

    super(props);
  }

  render() {
    return panelBack;
  }
}

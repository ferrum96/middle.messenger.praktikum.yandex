import Block from '../../core/block/Block.ts';
import Button from '../button/button.ts';

interface PanelBackProps {
  backButton: Button;
}

// language=hbs
const panelBackTemplate = `
    <div class="panel-back">
        {{{backButton}}}
    </div>
`;

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
    return panelBackTemplate;
  }
}

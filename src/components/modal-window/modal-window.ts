import Button from '../button/button.ts';
import Block from '../../core/block/Block.ts';

interface ModalWindowProps {
  className?: string;
  title: string;
  fileName?: string;
  content: unknown[];
  actionButton?: Button;
  closeButton?: Button;
}

// language=hbs
const modalWindowTemplate = `
    <div class="modal-window {{#if className}} {{className}} {{/if}}">
        <div class="modal-window__container">
            <h2 class="modal-window__title">{{title}}</h2>
            {{{closeButton}}}
            <div class="modal-window__filename">{{{fileName}}}</div>
            {{{content}}}
            {{{actionButton}}}
        </div>
    </div>
`;

export default class ModalWindow extends Block {
  constructor({
    className,
    title,
    content,
    fileName,
    actionButton
  }: ModalWindowProps) {
    super({
      className,
      title,
      content,
      fileName,
      closeButton: new Button({
        className: 'modal-window__close-button button_round',
        icon: 'assets/icons/Delete.svg',
        onClick: () => this._onCloseWindow()
      }),
      actionButton
    });
  }

  private _onCloseWindow() {
    this.getContent().classList.remove('modal-window_active');
  }

  render() {
    return modalWindowTemplate;
  }
}

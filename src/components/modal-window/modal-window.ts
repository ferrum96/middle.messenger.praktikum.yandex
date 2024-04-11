import './modal-window.sass';
import modalWindow from './modal-window.hbs?raw';
import Button from '../button/button';
import Block from '../../utils/Block';

interface ModalWindowProps {
  className?: string;
  title: string;
  fileName?: string;
  content: unknown[];
  actionButton?: Button;
  closeButton?: Button;
}

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
        icon: 'icons/Delete.svg',
        onClick: () => this._onCloseWindow()
      }),
      actionButton
    });
  }

  private _onCloseWindow() {
    this.getContent().classList.remove('modal-window_active');
  }

  render() {
    return modalWindow;
  }
}
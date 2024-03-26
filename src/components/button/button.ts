import Block from '../../utils/Block';
import './button.sass';
import button from './button.hbs?raw';
import './button.sass';

interface ButtonProps {
  text: string;
  className?: string;
  page?: string;
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props
    });
  }

  render() {
    return button;
  }
}

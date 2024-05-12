import Block from '../../core/block/Block.ts';
import { EventHandlers } from '../../utils/EventHandlers.ts';

interface ButtonProps {
  className?: string;
  text?: string;
  page?: string;
  icon?: string;
  type?: string;
  events?: {};
  onClick?: () => void;
}

// language=hbs
const buttonTemplate = `
    <button class="button{{#if className}} {{className}} {{/if}}" {{#if page}}page="{{page}}" {{/if}} {{#if
            type}}type={{type}}{{/if}}>
        {{text}}
        {{#if icon}}<img class="button__icon" src={{icon}} alt={{icon}}>{{/if}}
    </button>
`;

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        mouseup: (event: Event) => {
          if (props.onClick) {
            props.onClick();
          }

          if (this.props.page !== undefined) {
            EventHandlers.onClickRoute(event);
          }
        }
      }
    });
  }

  render() {
    return buttonTemplate;
  }
}

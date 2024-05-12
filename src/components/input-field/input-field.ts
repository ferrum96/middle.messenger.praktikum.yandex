import Block from '../../core/block/Block.ts';
import Input from '../input/input.ts';

interface InputFieldProps {
  className?: string;
  title?: string;
  input?: Input;
  error?: string;
  events?: {};
}

// language=hbs
const inputFieldTemplate = `
    <div class="input-field{{#if className}} {{ className }}{{/if}}">
        <label class="input-field__title">{{title}}</label>
        {{{ input }}}
        {{#if error}}<h5 class="input-field__error-text">{{error}}</h5>{{/if}}
    </div>
`;

export default class InputField extends Block {
  constructor(props: InputFieldProps) {
    super({
      ...props
    });
  }

  render() {
    return inputFieldTemplate;
  }
}

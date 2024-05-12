import Block from '../../core/block/Block.ts';
import ChatsList, { chatList } from '../../components/chats-list/chats-list.ts';
import ChatsDialog, {
  chatsDialog
} from '../../components/chats-dialog/chats-dialog.ts';

interface ChatsPageProps {
  chatsList: ChatsList;
  chatsDialog?: ChatsDialog;
}

// language=hbs
const messengerTemplate = `
    <div class="chats">
        {{{chatsList}}}
        {{{chatsDialog}}}
    </div>
`;

class MessengerPage extends Block {
  constructor() {
    const props: ChatsPageProps = {
      chatsList: new chatList(),
      chatsDialog: new chatsDialog()
    };

    super(props);
  }

  render() {
    return messengerTemplate;
  }
}

export const messengerPage: MessengerPage = new MessengerPage();

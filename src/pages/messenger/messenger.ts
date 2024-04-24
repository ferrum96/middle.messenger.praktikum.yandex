import './messenger.sass';
import Block from '../../utils/Block';
import messengerTemplate from './messenger.hbs?raw';
import ChatsList, { chatList } from '../../components/chats-list/chats-list.ts';
import ChatsDialog, {
  chatsDialog
} from '../../components/chats-dialog/chats-dialog.ts';

interface ChatsPageProps {
  chatsList: ChatsList;
  chatsDialog?: ChatsDialog;
}

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

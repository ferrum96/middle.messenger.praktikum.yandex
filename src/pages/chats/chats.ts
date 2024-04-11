import './chats.sass';
import Block from '../../utils/Block';
import chatsTemplate from './chats.hbs?raw';
import ChatsList, { chatList } from '../../components/chats-list/chats-list.ts';
import ChatsDialog, {
  chatsDialog
} from '../../components/chats-dialog/chats-dialog.ts';

interface ChatsPageProps {
  chatsList: ChatsList;
  chatsDialog?: ChatsDialog;
}

class ChatsPage extends Block {
  constructor() {
    const props: ChatsPageProps = {
      chatsList: new chatList(),
      chatsDialog: new chatsDialog()
    };

    super(props);
  }

  render() {
    return chatsTemplate;
  }
}

export const chatsPage: ChatsPage = new ChatsPage();

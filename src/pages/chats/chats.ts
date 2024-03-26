import './chats.sass';
import Block from '../../utils/Block';
import chats from './chats.hbs?raw';
import ChatList from '../../components/chat-list/chat-list';
import Avatar from '../../components/avatar/avatar';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import ChatListItem from '../../components/chat-list-item/chat-list-item';
import MenuWindow from '../../components/menu-window/menu-window';
import MenuItem from '../../components/menu-item/menu-item';

interface ChatsPageProps {
  chatList: ChatList;
  avatar: Avatar;
  userName: string;
  chatMessages?: MenuWindow[];
  sendMessageInput: Input;
  sendMessageButton: Button;
}

const chatListProps = {
    chatListItem: [
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Иван',
        text: 'Изображение',
        time: '10:46',
        countUnreadMessages: 2
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Иван',
        text: 'Изображение',
        time: '10:46'
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Киноклуб',
        text: 'Вы: стикер',
        time: 'пн',
        countUnreadMessages: 4
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'тет-а-теты',
        text: 'И Human Interface Guidelines и Material Design рекомендуют ... И Human Interface Guidelines и Material Design рекомендуют ...',
        time: 'пн',
        countUnreadMessages: 4
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Иван',
        text: 'Изображение',
        time: '10:46',
        countUnreadMessages: 2
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Иван',
        text: 'Изображение',
        time: '10:46'
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Киноклуб',
        text: 'Вы: стикер',
        time: 'пн',
        countUnreadMessages: 4
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'тет-а-теты',
        text: 'И Human Interface Guidelines и Material Design рекомендуют ... И Human Interface Guidelines и Material Design рекомендуют ...',
        time: 'пн',
        countUnreadMessages: 4
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Иван',
        text: 'Изображение',
        time: '10:46',
        countUnreadMessages: 2
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Иван',
        text: 'Изображение',
        time: '10:46'
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Киноклуб',
        text: 'Вы: стикер',
        time: 'пн',
        countUnreadMessages: 4
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'тет-а-теты',
        text: 'И Human Interface Guidelines и Material Design рекомендуют ... И Human Interface Guidelines и Material Design рекомендуют ...',
        time: 'пн',
        countUnreadMessages: 4
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Иван',
        text: 'Изображение',
        time: '10:46',
        countUnreadMessages: 2
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Иван',
        text: 'Изображение',
        time: '10:46'
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Киноклуб',
        text: 'Вы: стикер',
        time: 'пн',
        countUnreadMessages: 4
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'тет-а-теты',
        text: 'И Human Interface Guidelines и Material Design рекомендуют ... ',
        time: 'пн',
        countUnreadMessages: 4
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'тет-а-теты',
        text: 'И Human Interface Guidelines и Material Design рекомендуют ...',
        time: 'пн',
        countUnreadMessages: 4
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Иван',
        text: 'Изображение',
        time: '10:46',
        countUnreadMessages: 2
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Иван',
        text: 'Изображение',
        time: '10:46'
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'Киноклуб',
        text: 'Вы: стикер',
        time: 'пн',
        countUnreadMessages: 4
      }),
      new ChatListItem({
        avatar: new Avatar({ className: 'chats-list-item__avatar', alt: '' }),
        name: 'тет-а-теты',
        text: 'И Human Interface Guidelines и Material Design рекомендуют ...',
        time: 'пн',
        countUnreadMessages: 4
      })
    ]
  },
  avatarProps = {
    className: 'chat-window__avatar',
    alt: ''
  },
  sendMessageInputProps = {
    className: 'chats-window__send-message',
    placeholder: 'Сообщение'
  },
  sendMessageButtonProps = {
    className: 'button_round',
    text: '→'
  },
  chatMessagesProps = [
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    }),
    new MenuWindow({
      menuItems: [
        new MenuItem({
          title: 'Добавить пользователя',
          icon: '../../icons/Upload-file.svg'
        }),
        new MenuItem({
          title: 'Удалить пользователя',
          icon: '../../icons/Upload-file.svg'
        })
      ]
    })
  ];

export default class ChatsPage extends Block<ChatsPageProps> {
  constructor() {
    super({
      chatList: new ChatList(chatListProps),
      avatar: new Avatar(avatarProps),
      userName: 'Иван',
      chatMessages: chatMessagesProps,
      sendMessageInput: new Input(sendMessageInputProps),
      sendMessageButton: new Button(sendMessageButtonProps)
    });
  }

  render() {
    return chats;
  }
}

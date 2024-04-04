import './chats.sass';
import Block from '../../utils/Block';
import chats from './chats.hbs?raw';
import ChatList from '../../components/chat-list/chat-list';
import Avatar from '../../components/avatar/avatar';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import ChatListItem from '../../components/chat-list-item/chat-list-item';
import Message from '../../components/message/message.ts';
import MessagesContainer from '../../components/messages-container/messages-container.ts';
import MenuWindow from '../../components/menu-window/menu-window.ts';
import MenuItem from '../../components/menu-item/menu-item.ts';

interface ChatsPageProps {
  chatList: ChatList;
  avatar: Avatar;
  userName: string;
  customUserButton: Button;
  uploadButton: Button;
  chatMessages?: MessagesContainer[];
  sendMessageInput: Input;
  sendMessageButton: Button;
}

const chatList = new ChatList({
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
  }),
  avatar = new Avatar({
    className: 'chat-window__avatar',
    alt: ''
  }),
  userName = 'Иван',
  customUsersButton = new Button({
    className: 'button_round chats-window__custom-button',
    icon: '/icons/Kebab-menu.svg',
    menu: new MenuWindow({
      className: 'chats-window__user-settings',
      menuItems: [
        new MenuItem({
          icon: 'icons/Add.svg',
          title: 'Добавить пользователя'
        }),
        new MenuItem({
          icon: 'icons/Delete.svg',
          title: 'Удалить пользователя'
        })
      ]
    })
  }),
  uploadButton = new Button({
    className: 'chats-window__upload-button',
    icon: '/icons/Upload-menu.jpg',
    menu: new MenuWindow({
      className: 'chats-window__file-settings',
      menuItems: [
        new MenuItem({
          icon: 'icons/Upload-photo.svg',
          title: 'Фото или Видео'
        }),
        new MenuItem({
          icon: 'icons/Upload-file.svg',
          title: 'Файл'
        }),
        new MenuItem({
          icon: 'icons/Location.svg',
          title: 'Локация'
        })
      ]
    })
  }),
  sendMessageInput = new Input({
    name: 'sendMessage',
    className: 'chats-window__send-message',
    placeholder: 'Сообщение'
  }),
  sendMessageButton = new Button({
    className: 'button_round',
    icon: '/icons/Right-arrow.svg'
  }),
  chatMessages = [
    new MessagesContainer({
      date: '19 июня',
      messagesList: [
        new Message({
          className: 'message_from',
          content:
            'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
          time: '11:56'
        }),
        new Message({
          className: 'message_to',
          content: 'Привет!но продали на аукционе за 45000 евро.',
          time: '12:56'
        })
      ]
    }),
    new MessagesContainer({
      date: '25 июня',
      messagesList: [
        new Message({
          className: 'message_from',
          content:
            'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
          time: '11:56'
        }),
        new Message({
          className: 'message_to',
          content:
            'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
          time: '11:56'
        })
      ]
    }),
    new MessagesContainer({
      date: '1 июня',
      messagesList: [
        new Message({
          className: 'message_from',
          content:
            'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
          time: '11:56'
        }),
        new Message({
          className: 'message_to',
          content:
            'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
          time: '11:56'
        })
      ]
    })
  ];
export default class ChatsPage extends Block<ChatsPageProps> {
  constructor() {
    super({
      chatList,
      avatar,
      userName,
      customUserButton: customUsersButton,
      // userSettings,
      uploadButton,
      // fileSettings,
      chatMessages,
      sendMessageInput,
      sendMessageButton
    });
  }

  render() {
    return chats;
  }
}

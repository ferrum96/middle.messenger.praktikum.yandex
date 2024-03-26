import './chats.sass';
import Block from '../../utils/Block';
import chats from './chats.hbs?raw';
import ChatList from '../../components/chat-list/chat-list';
import Avatar from '../../components/avatar/avatar';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import ChatListItem from '../../components/chat-list-item/chat-list-item';
import Message from '../../components/message/message.ts';
import MessagesContainer from '../../components/messagesContainer/messages-container.ts';

interface ChatsPageProps {
  chatList: ChatList;
  avatar: Avatar;
  userName: string;
  chatMessages?: MessagesContainer[];
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

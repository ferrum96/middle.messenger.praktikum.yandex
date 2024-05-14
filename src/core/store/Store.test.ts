import { expect } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import store from './Store.ts';
import { beforeEach, afterEach } from 'mocha';
import { User } from '../../utils/types.ts';

describe('Store', () => {
  let emitSpy: SinonSpy;
  let setSpy: SinonSpy;
  let getSpy: SinonSpy;
  const user: User = {
    id: 1,
    login: 'John',
    first_name: 'John',
    second_name: 'John',
    display_name: null,
    avatar: null,
    phone: '',
    email: ''
  };

  beforeEach(() => {
    store.set('user', user);

    emitSpy = sinon.spy(store, 'emit');
    setSpy = sinon.spy(store, 'set');
    getSpy = sinon.spy(store, 'getState');
  });

  afterEach(() => {
    store.setResetState();
    emitSpy.restore();
    setSpy.restore();
    getSpy.restore();
  });

  it('should emit "updated" event when state is updated', () => {
    store.set('auth', true);
    expect(emitSpy.calledOnceWith('updated')).to.be.true;
  });

  it('should call set method when updating state', () => {
    store.set('auth', true);
    expect(setSpy.calledOnceWith('auth', true)).to.be.true;
  });

  it('should return state when getState is called', () => {
    const state = store.getState();

    expect(getSpy.calledOnce).to.be.true;
    expect(state).to.deep.equal({
      auth: false,
      user: {
        id: 1,
        login: 'John',
        first_name: 'John',
        second_name: 'John',
        display_name: null,
        avatar: null,
        phone: '',
        email: ''
      },
      chats: null,
      currentChat: null,
      currentChatUsers: [],
      currentChatMessages: [],
      searchingUsers: null,
      currentUser: null,
      isLoadedFile: false,
      fileName: '',
      formData: {},
      searchingLogin: null,
      isSearchingUsers: false
    });
  });
});

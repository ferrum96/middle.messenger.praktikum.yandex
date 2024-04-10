import Block from './Block.ts';
import store, { State, StoreEvents } from './Store.ts';
import isEqual from './isEqual.ts';

export default function connect<Props extends {}>(
  Component: typeof Block<Props>
) {
  return class extends Component {
    constructor(props?: Props) {
      // сохраняем начальное состояние
      let state: Props = getStateToProps(store.getState()) as unknown as Props;

      super({ ...props, ...state });

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // при обновлении получаем новое состояние
        const newState: Props = getStateToProps(
          store.getState()
        ) as unknown as Props;

        // если что-то из используемых данных поменялось, обновляем компонент
        if (!isEqual(state, newState)) {
          this.setProps(newState);
        }

        // не забываем сохранить новое состояние
        state = newState;
      });
    }
  };
}

function getStateToProps(state: State): State {
  return { ...state };
}

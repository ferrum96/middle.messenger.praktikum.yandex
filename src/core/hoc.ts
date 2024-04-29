import Block, { Props } from './Block.ts';
import isEqual from '../utils/isEqual.ts';
import store, { State, StoreEvents } from './Store.ts';

export function hoc(mapStateToProps: (state: State) => Props) {
  return function <T extends typeof Block>(Component: T): T {
    // @ts-expect-error mixin
    return class extends Component {
      constructor(args: Props) {
        let state: Props = mapStateToProps(store.getState());

        super({ ...args, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState: Props = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    };
  };
}

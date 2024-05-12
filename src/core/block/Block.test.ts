import { expect } from 'chai';
import Block from './Block';
import { Props } from './Block.ts';
import isEqual from '../../utils/isEqual.ts';
import sinon from 'sinon';

describe('Block', () => {
  it('should initialize with props and children', () => {
    const block = new Block({
      prop1: 'value1',
      child1: new Block({})
    });

    expect(block.props.prop1).to.equal('value1');
    expect(block.children.child1).to.be.an.instanceOf(Block);
  });

  it('should register event handlers correctly', () => {
    const block = new Block({});
    const eventBus = block.eventBus();
    const onSpy = sinon.spy(eventBus, 'on');

    block['_registerEvents'](eventBus);

    expect(onSpy.callCount).to.equal(4);
    expect(onSpy.calledWith(Block.EVENTS.INIT, sinon.match.func)).to.be.true;
    expect(onSpy.calledWith(Block.EVENTS.FLOW_CDM, sinon.match.func)).to.be
      .true;
    expect(onSpy.calledWith(Block.EVENTS.FLOW_CDU, sinon.match.func)).to.be
      .true;
    expect(onSpy.calledWith(Block.EVENTS.FLOW_RENDER, sinon.match.func)).to.be
      .true;

    onSpy.restore();
  });

  it('should call componentDidUpdate when props change', () => {
    let componentDidUpdateCalled = false;

    class TestBlock extends Block {
      constructor(props: Props) {
        super(props);
      }

      componentDidUpdate(oldProps: Props, newProps: Props) {
        componentDidUpdateCalled = true;
        return isEqual(oldProps, newProps);
      }
    }

    const block = new TestBlock({ prop1: 'value1' });
    block.setProps({ prop1: 'updatedValue' });

    expect(componentDidUpdateCalled).to.be.true;
  });
});

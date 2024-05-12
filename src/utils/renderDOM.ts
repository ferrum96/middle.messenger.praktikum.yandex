import Block from '../core/block/Block.ts';

export function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root === null) {
    return '';
  }
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}

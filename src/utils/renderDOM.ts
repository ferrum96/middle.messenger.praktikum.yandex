import Block from './Block';

export function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root === null) {
    return '';
  }
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}

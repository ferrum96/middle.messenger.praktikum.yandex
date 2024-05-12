import Block from '../core/block/Block.ts';

export default function deepClone(value: any): any {
  if (value instanceof Block) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(item => deepClone(item));
  }

  if (typeof value === 'object' && value !== null) {
    const cloned: any = {};
    for (const key in value) {
      cloned[key] = deepClone(value[key]);
    }
    return cloned;
  }

  return value;
}

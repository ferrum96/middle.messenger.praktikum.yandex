import Block from '../core/block/Block.ts';

export default function deepClone<T>(value: T): T {
  if (value instanceof Block) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(item => deepClone(item)) as T;
  }

  if (typeof value === 'object' && value !== null) {
    const cloned: Partial<T> = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        cloned[key] = deepClone(value[key]);
      }
    }
    return cloned as T;
  }

  return value;
}

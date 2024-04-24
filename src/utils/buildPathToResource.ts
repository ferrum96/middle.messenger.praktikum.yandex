import { HOST } from './HTTP.ts';

export function buildPathToResource(resource: string | null) {
  return `${HOST}/resources${resource}` ?? null;
}

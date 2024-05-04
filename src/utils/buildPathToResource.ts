import { HOST } from '../core/HTTP.ts';

export function buildPathToResource(resource: string | null) {
  return `${HOST}/resources${resource}` ?? null;
}

import { HOST } from '../core/http/HTTP.ts';

export function buildPathToResource(resource: string | null) {
  return `${HOST}/resources${resource}` ?? null;
}

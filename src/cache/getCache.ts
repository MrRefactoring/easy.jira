import { Context } from '../context';
import { Cache } from './cache';

const caches: Map<Context, Cache> = new Map();

export function getCache(context: Context): Cache {
  if (!caches.has(context)) {
    caches.set(context, new Cache(context));
  }

  return caches.get(context)!;
}

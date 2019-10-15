import {writable} from 'svelte/store';
export const baseurl =
  process.env.base_url || 'https://sapperweb.cdn.prismic.io/api/v2';
export const refid = writable();

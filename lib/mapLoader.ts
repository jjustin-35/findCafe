import { Loader } from '@googlemaps/js-api-loader';

let loader: Loader | null = null;

export const getLoader = () => {
  if (!loader) {
    loader = new Loader({
      apiKey: process.env.GCP_MAP_KEY,
      version: 'weekly',
      libraries: ['places'],
    });
  }
  return loader;
};

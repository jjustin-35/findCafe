const data = {
  coffee: {
    src: '/images/coffee.svg',
    alt: 'icon-coffee',
  },
  'coffee-brown': {
    src: '/images/coffee-brown.svg',
    alt: 'icon-coffee-brown',
  },
  'coffee-white': {
    src: '/images/coffee-white.svg',
    alt: 'icon-coffee-white',
  },
} as const;

export enum IconType {
  coffee = 'coffee',
  'coffee-brown' = 'coffee-brown',
  'coffee-white' = 'coffee-white',
  search = 'search',
  favorite = 'favorite',
  feedback = 'feedback',
  menu = 'menu',
}

export default data;

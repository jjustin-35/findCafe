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

export type IconType = keyof typeof data;
export default data;
import { IconType } from '@/components/Icon/data';

const data = [
  {
    label: '搜尋咖啡廳',
    href: '/cafe',
    icon: IconType.search,
  },
  {
    label: '我的收藏',
    href: '/favorite',
    icon: IconType.favorite,
  },
  {
    label: '意見回饋',
    href: 'https://forms.gle/A841mMnZGmicaHNE8',
    icon: IconType.feedback,
    target: '_blank',
  },
];

export default data;

import { ImageTextBannerProps } from '@/components/ImageTextBanner';

const data: ImageTextBannerProps[] = [
  {
    data: {
      image: {
        src: '/images/home-intro-1.png',
        alt: 'home-intro-1',
      },
      title: '搜尋咖啡廳',
      description:
        '當人們需要個喝咖啡的地方時，往往會陷入不知道要去哪裡、哪裡有咖啡廳、咖啡廳不符合需求的窘境。為了解決這樣的問題，我們架設了這個網站，希望能幫助你找到最適合你的咖啡廳。',
    },
  },
  {
    data: {
      image: {
        src: '/images/home-intro-2.png',
        alt: 'home-intro-2',
      },
      title: '咖啡廳評論',
      description:
        '為你造訪過的咖啡廳下評論吧！不僅僅可以讓更多用戶了解這間咖啡廳，也可以為你留下足跡，繪出屬於你的咖啡地圖！此外，你更可以將喜歡的咖啡廳加入我的最愛，方便再度造訪！',
    },
    isReverse: true,
  },
  {
    data: {
      image: {
        src: '/images/home-intro-3.png',
        alt: 'home-intro-3',
      },
      title: '新增咖啡廳',
      description:
        '找不到你心愛中的咖啡廳嗎？你可以自己新增上來！填寫幾個店家的基本資訊，並附上幾張照片以及你的心得、評價，就可以將你喜歡的咖啡廳推薦給其他使用者！',
    },
  },
];

export default data;

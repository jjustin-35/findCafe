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
        '想找理想咖啡廳？我們的搜尋功能讓你輕鬆篩選！依照標籤、評分快速過濾，並透過地圖查看位置。無論你需要安靜工作、聚會或品嚐好咖啡，都能找到最適合的場所。',
    },
    styles: {
      description: {
        color: 'grey.900',
      },
    },
  },
  {
    data: {
      image: {
        src: '/images/home-intro-2.png',
        alt: 'home-intro-2',
      },
      title: '收藏咖啡廳',
      description:
        '找到喜歡的咖啡廳了嗎？點擊愛心按鈕即可收藏！我們的收藏功能讓你輕鬆整理喜愛的咖啡廳清單，隨時查看並規劃下次造訪，再也不用擔心忘記那些值得再訪的好地方。',
    },
    styles: {
      isReverse: true,
      description: {
        color: 'grey.900',
      },
    },
  },
  {
    data: {
      image: {
        src: '/images/home-intro-3.png',
        alt: 'home-intro-3',
      },
      title: '查看咖啡廳資訊',
      description:
        '點擊咖啡廳查看評分、標籤、地址與照片等詳細資訊。我們提供完整店家介紹，讓你了解每家店的特色與氛圍，在前往前就能確定是否符合你的需求，無論是工作、聚會或品嚐咖啡。',
    },
    styles: {
      description: {
        color: 'grey.900',
      },
    },
  },
];

export default data;

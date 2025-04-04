export const tagsWithRating = {
  wifi: 'wifi 良好',
  seat: '座位多',
  quiet: '環境安靜',
  tasty: '餐點好吃',
  cheap: '東西便宜',
  music: '音樂好聽',
} as const;

export const tagsWithRatingKeys = Object.keys(tagsWithRating) as TagTypeWithRating[];

export const tagsWithoutRating = {
  limited_time: '不限時',
  standing_desk: '可站立工作',
  socket: '有插頭',
} as const;

export const tagsWithoutRatingKeys = Object.keys(tagsWithoutRating) as TagTypeWithoutRating[];

const tagData = {
  ...tagsWithRating,
  ...tagsWithoutRating,
};

export const tags = Object.keys(tagData) as TagType[];
export type TagTypeWithRating = keyof typeof tagsWithRating;
export type TagTypeWithoutRating = keyof typeof tagsWithoutRating;
export type TagType = TagTypeWithRating | TagTypeWithoutRating;

export default tagData;

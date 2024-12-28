import { ApiCafeType, CafeData } from "@/constants/types";

export const cafeDataTransform = (data: ApiCafeType[]): CafeData[] => {
  const cafeData = data.map((item) => {
    return {
      name: item.name,
      url: item.url,
    }
  })
};

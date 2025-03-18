// 使用 Haversine 公式計算兩點間的實際距離
export const calculateDistance = (position1: { lat: number, lng: number }, position2: { lat: number, lng: number }): number => {
    const R = 6371;
    const dLat = (position2.lat - position1.lat) * Math.PI / 180;
    const dLng = (position2.lng - position1.lng) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(position1.lat * Math.PI / 180) * Math.cos(position2.lat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 距離，單位為公里
    return distance;
};
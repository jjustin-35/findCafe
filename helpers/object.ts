export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export const isEqual = (object1: object, object2: object): boolean => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  const result = keys1.every((key) => object1?.[key] === object2?.[key]);

  return result;
};

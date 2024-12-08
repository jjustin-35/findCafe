export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export const isEqual = (object1: object, object2: object): boolean => {
  if (!object1 || !object2 || typeof object1 !== 'object' || typeof object2 !== 'object') {
    return object1 === object2;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  const result = keys1.every((key) => object1?.[key] === object2?.[key]);

  return result;
};

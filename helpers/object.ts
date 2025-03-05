export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export const isEqual = (object1: object, object2: object): boolean => {
  if (!object1 || !object2 || typeof object1 !== 'object' || typeof object2 !== 'object') {
    return object1 === object2;
  }

  const json1 = JSON.stringify(object1);
  const json2 = JSON.stringify(object2);

  return json1 === json2;
};

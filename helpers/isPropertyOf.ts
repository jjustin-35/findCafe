const isPropertyOf = <T extends object>(key: any, object: T): key is keyof T => {
  return !!object[key];
};

export default isPropertyOf;

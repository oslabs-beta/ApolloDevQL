// import {equal} from '@wry/equality';

const isLogValuePrimitive = (val: any): boolean => {
  return val == null || /^[sbn]/.test(typeof val);
};

const eventLogIsDifferent = (a: any, b: any): boolean => {
  // return equal(a, b);
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey];
      const aVal = a[bKey];
      if (typeof bVal === 'function') {
        return bVal(aVal);
      }
      return isLogValuePrimitive(bVal)
        ? bVal === aVal
        : eventLogIsDifferent(aVal, bVal);
    })
  );
};

export default eventLogIsDifferent;

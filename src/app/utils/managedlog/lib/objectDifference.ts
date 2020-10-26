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

/**
 * @param objStore : ReadonlyArray<Record<string, any>>
 * @param objType : string 
 * Desc:: processes the document.definitions or mutation.definitions of the query/mutation operation
 *        this was necessary as some clients do not have a name.value on the document/mutation object
 *        especially then having to get the operations names form the list of sections that make up the operation
 * Returns the operation name of the query or mutation
 */
export const validateOperationName = (objStore: ReadonlyArray<Record<string, any>>, objType: string,): string => {
  if (objStore.length) {
    if (objStore[0].name) {
      return objStore[0].name.value;
    } else {
      if (objStore[0].selectionSet && objStore[0].selectionSet.selections) {
        if (objStore[0].selectionSet.selections.length) {
          return objStore[0].selectionSet.selections.reduce((operationName, selection) => {
              // reduce selectionSet.selections Array's name.value to an array of name values
              return selection && selection.name && selection.name.value ? [...operationName, selection.name.value.toLowerCase()] : operationName;
            }, []).reduce((opera: string, curr: string): string => {
              // reduce array of names values to a string padding front and back with ( & ) respectively
              if (curr.toLowerCase().trim().length > 0) {
                if (opera === objType.toLowerCase()) {
                  return `${opera} (${curr.toLowerCase().trim()})`;
                } else {
                  return `${opera.substr(0, opera.length - 1)}, ${curr.toLowerCase().trim()})`;
                }
              }
              return opera;
            }, `${objType.toLowerCase()}`);
        }
      }
    }
  }
  return objType.toLowerCase();
}

export default eventLogIsDifferent;

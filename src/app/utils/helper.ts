/**
 * An enumerator for the DIRECTION of item to pluck from an Array mainly FIRST or LAST
 */
enum DIRECTION {
  FRONT,
  END,
}

/**
 *
 * @param inputArray input Array of strings
 * @param position  the position to pluck
 * @param defaultValue a default value to return when position of the array does not exist
 */
export function pluck(
  inputArray: string[],
  position: DIRECTION = 0,
  defaultValue: any = undefined,
): any {
  return inputArray && inputArray.length
    ? inputArray[position === DIRECTION.FRONT ? 0 : inputArray.length - 1]
    : defaultValue;
}

export function extractOpertionName(operation: string): string {
  let operate = operation ? pluck(operation.split('(')) : null;
  console.log('Initial Extracted Operation :: ', operate);
  if (!operate) return 'Query';
  return pluck(operation.split(' '), DIRECTION.END, '');
}

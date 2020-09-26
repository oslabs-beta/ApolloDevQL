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

export function plucked<T>(
  inputArray: Array<T>,
  position: DIRECTION = 0,
  defaultValue: T | undefined,
): T | undefined {
  return inputArray && inputArray.length
    ? inputArray[position === DIRECTION.FRONT ? 0 : inputArray.length - 1]
    : defaultValue;
}

/**
 * Extract the name of a query request or mutation using the query passed to the grapqql server
 * @param operation The request operation object from the network request object
 * Returns a string or null if not avaialable and in some cases a null if the request object has no query passed
 */
export function extractOperationName(operation: any): string {
  const operate =
    operation &&
    operation.request &&
    operation.request.operation &&
    operation.request.operation.query
      ? pluck(operation.request.operation.query.split('(')) // pluck the first item from the array after the query is split using '(' as teh delimter
      : null;
  if (!operate) return 'Query'; // return a constant response 'Query' if the when the query was split, there was no item(s) in the array
  return pluck(operate.split(' '), DIRECTION.END, ''); // pluck the last item from the 'operate' array, this will definitely be the name of the operation form the query passed to the graphql server
}

// declare global {
//   interface Array<T> {
//     groupBy(groupKey: string): Array<T>;
//   }
// }

/**
 *
 * @param {*} key the property/key to use for grouping
 * this returns an object with keys being the values for which the groups are summarized
 * and the values, an array of the timing data
 *
 * An error could occur here, right click and choose "declare 'groupBy'" from the contenxt menu
 */
// Array.prototype.groupBy = function <T>(key: string): Array<T> {
//   return (<Array<any>>this).reduce((summary: any, timingData: T): Array<T> => {
//     return {
//       ...summary,
//       [timingData[key]]: summary[timingData[key]]
//         ? [...summary[timingData[key]], timingData]
//         : [timingData],
//     };
//   }, {});
// };

/**
 *
 * @param inputArray the array to be grouped
 * @param key the property/key to use for grouping
 * this returns an object with keys being the values for which the groups are summarized
 * and the values, an array of the timing data
 */
const groupResolverTimingBy = (inputArray: any[], key: string): any[] => {
  return inputArray.reduce((summary: any, timingData: any): any => {
    // exisitng key in summary summary[timingData[key]]
    // the value is the Array stored IN summary[timingData[key]] and a the new timingData
    return {
      ...summary,
      [timingData[key]]: summary[timingData[key]]
        ? [...summary[timingData[key]], timingData]
        : [timingData],
    };
  }, {});
};

/**
 *    This function returns a number given 'timing' that is a fraction of totalDuration and a ratio of the totalScale
 * @param timing the resolver's timeline
 * @param totalDuration the response's total duration
 * @param totalScale a numeric scale that underscores the length of the graph to be rendered default 100
 */
const timeToScale = (
  timing: number,
  totalDuration: number,
  totalScale: number,
): number => {
  return (timing / totalDuration) * totalScale;
};

/**
 *
 * @param resolverTimings a grouped array of resolver timmings from the response property/key event log
 * @param totalDuration the total duration of the entire response
 * @param totalScale a numeric scale that underscores the length of the graph to be rendered default 100
 */
const scaleResolverTiming = (
  resolverTimings: any,
  totalDuration: number,
  totalScale: number,
): any => {
  return Object.keys(resolverTimings).reduce(
    (resolvedTimings: any, timingSet: string): any => ({
      ...resolvedTimings,
      [timingSet]: resolverTimings[timingSet].map(timing => ({
        ...timing,
        durationScale: timeToScale(
          timing.durationScale,
          totalDuration,
          totalScale,
        ),
        startOffset: timeToScale(timing.startOffset, totalDuration, totalScale),
      })),
    }),
    {},
  );
};

/**
 *
 * @param resolverTimings an array of resolver timmings from the response property/key event log
 * @param groupPropertyKey a property/key to be used to group the initial resolver timing data received from response of event log
 * @param totalDuration the total duration of the entire response
 * @param totalScale a numeric scale that underscores the length of the graph to be rendered default 100
 */
export function transformTimingData(
  resolverTimings: Array<any>,
  totalDuration: number,
  groupPropertyKey: string = 'startOffset',
  totalScale: number = 100,
): Array<any> {
  return scaleResolverTiming(
    groupResolverTimingBy(
      resolverTimings
        .map((timing: any) => {
          const {path, startOffset, duration} = timing;
          return {
            durationScale: duration,
            duration,
            startOffset,
            path: path.join('.'),
          };
        })
        .sort(
          (timingA: any, timingB: any) =>
            timingA.startOffset - timingB.startOffset,
        ),
      groupPropertyKey,
    ),
    // .groupBy(groupPropertyKey),
    totalDuration,
    totalScale,
  );
}

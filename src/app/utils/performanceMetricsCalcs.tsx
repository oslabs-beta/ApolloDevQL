// find the max time btw events that have been tracked so far by Apollo
const getMaxEventTime = (eventsObj: any): number => {
  console.log('in get MaxEventTime');
  // make events into an array of key, value pairs
  const eventsObjDuple: Array<any> = Object.entries(eventsObj);

  const eventsArray = eventsObjDuple.map(el => el[1]);

  let max = 0;

  // if there are events
  if (eventsArray.length > 0) {
    // find max time
    max = eventsArray.reduce((acc, curr) => {
      if (acc < curr.time) {
        return curr.time;
      }

      return acc;

      // start acc at 0
    }, 0);
  }
  return max;
};

export default getMaxEventTime;

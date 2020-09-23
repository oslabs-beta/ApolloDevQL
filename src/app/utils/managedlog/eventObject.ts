import {EventBase} from './lib/apollo11types';
import eventLogIsDifferent from './lib/objectDifference';
import eventLogDataObject from './lib/eventLogData';

class EventLogContainer<T> {
  private eventsBase: EventBase | undefined;

  private eventLogData: T | undefined;

  constructor(srceObj?: T) {
    this.eventLogData = srceObj;
    this.eventsBase = {
      mutation: {},
      query: {},
    };
  }

  sequenceApolloLog<U>(eventLog: U) {
    this.eventsBase[0] = eventLog;
    console.log('EventLog to Sequence :: ', eventLog);
  }

  getDataStore() {
    return this.eventLogData;
  }

  getTempStore() {
    return this.eventsBase;
  }
}

// // TESTS
// const testobj = new EventLogContainer(new eventLogDataObject());
// const testEvtLog: EventBase = {
//   mutation: {3: {}, 4: {}},
//   query: {1: {}, 2: {}},
// };
// console.log('===== EventContainer Object ====');
// console.log(testobj);
// console.log('===== Sample EventLog to Sequence ====');
// console.log(testobj.sequenceApolloLog(testEvtLog));
// console.log('===== EventContainer DataStore ====');
// console.log(testobj.getDataStore());
// console.log('===== EventBase Local Container Store ====');
// console.log(testobj.getTempStore());

export default new EventLogContainer(new eventLogDataObject());

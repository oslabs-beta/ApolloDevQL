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

// export default new EventLogContainer(new eventLogDataObject());

export default <T>(LogObject: new () => T): EventLogContainer<T> => {
  return new EventLogContainer<T>(new LogObject());
};

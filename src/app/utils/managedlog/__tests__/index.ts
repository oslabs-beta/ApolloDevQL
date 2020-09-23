import {EventBase} from '../lib/apollo11types';
import eventLogIsDifferent from '../lib/objectDifference';
import eventLogDataObject from '../lib/eventLogData';
import EventLogContainer from '../eventObject';

// TESTS
const testobj = EventLogContainer(eventLogDataObject);
const testEvtLog: EventBase = {
  mutation: {3: {}, 4: {}},
  query: {1: {}, 2: {}},
};
console.log('===== EventContainer Object ====');
console.log(testobj);
console.log('===== Sample EventLog to Sequence ====');
console.log(testobj.sequenceApolloLog(testEvtLog));
console.log('===== EventContainer DataStore ====');
console.log(testobj.getDataStore());
console.log('===== EventBase Local Container Store ====');
console.log(testobj.getTempStore());

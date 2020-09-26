// import {EventStore} from '../lib/apollo11types';
import EventLogDataObject from '../lib/eventLogData';
import EventLogContainer, {EventLogStore} from '../eventObject';
// import eventLogIsDifferent from '../lib/objectDifference';

// TESTS
const testobj = EventLogContainer(new EventLogDataObject());
// const testEvtLog: EventBase = {
//   mutation: {3: {}, 4: {}},
//   query: {1: {}, 2: {}},
// };
const testStore: EventLogStore = {
  queryManager: {
    mutationStore: {3: {}, 4: {}},
    queriesStore: {1: {}, 2: {}},
  },
  eventId: '1600905405018',
};
console.log('===== EventContainer Object ====');
console.log(testobj);
console.log('===== Sample EventLog to Sequence ====');
console.log(testobj.sequenceApolloLog(testStore));
console.log('===== EventContainer DataStore ====');
console.log(testobj.getDataStore());
console.log('===== EventBase Local Container Store ====');
console.log(testobj.getTempStore());

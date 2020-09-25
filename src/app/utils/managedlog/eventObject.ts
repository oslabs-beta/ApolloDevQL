import React from 'react';
import {EventBase} from './lib/apollo11types';
import eventLogIsDifferent from './lib/objectDifference';
import EventLogDataObject from './lib/eventLogData';
import EventNode from './lib/eventLogNode';

export type EventStore = {
  eventId: string;
  queryManager: {
    mutationStore: Object;
    queriesStore: Object;
  };
};

export class EventLogContainer {
  private eventsBase: EventBase | undefined;

  private eventLogData: EventLogDataObject | undefined;

  constructor(srceObj?: EventLogDataObject) {
    this.eventLogData = srceObj;
    this.eventsBase = {
      mutation: {},
      query: {},
    };
  }

  logEvent(
    eventNode: EventNode,
    baseId: string,
    setEvents?: React.Dispatch<React.SetStateAction<{}>>,
  ) {
    this.eventLogData.addEventLog(eventNode);
    this.eventsBase[eventNode.content.type][baseId] = eventNode.content.event;
    if (setEvents) {
      // perform the State Hook
      setEvents(() => {
        return this.eventLogData;
      });
    }
  }

  sequenceApolloLog(
    eventLog: EventStore,
    setEvents?: React.Dispatch<React.SetStateAction<{}>>,
  ) {
    const {
      queryManager: {mutationStore, queriesStore},
      eventId,
    } = eventLog;
    // perform queriesStore Check
    Object.keys(queriesStore).forEach(storeKey => {
      const proposedQry: EventNode = new EventNode({
        event: {
          ...queriesStore[storeKey],
          request: {
            operation: {
              operationName:
                queriesStore[storeKey].document.definitions[0].name.value,
              query: queriesStore[storeKey].document.loc.source.body,
            },
          },
        },
        type: 'query',
        eventId,
      });
      if (!this.eventsBase.query[storeKey]) {
        this.logEvent(proposedQry, storeKey, setEvents);
      } else {
        // perform the diff
        if (
          !eventLogIsDifferent(
            {
              document: this.eventsBase.query[storeKey].document,
              // diff: null, //this.eventsBase.query[storeKey].diff,
            },
            {
              document: queriesStore[storeKey].document,
              // diff: null, //queriesStore[storeKey].diff,
            },
          )
        ) {
          this.logEvent(proposedQry, storeKey, setEvents);
        }
      }
    });
    // perform mutationStore Check
    Object.keys(mutationStore).forEach(storeKey => {
      const proposedMutate: EventNode = new EventNode({
        event: {
          ...mutationStore[storeKey],
          request: {
            operation: {
              operationName:
                mutationStore[storeKey].mutation.definitions[0].name.value,
              query: mutationStore[storeKey].mutation.loc.source.body,
            },
          },
        },
        type: 'mutation',
        eventId,
      });
      if (!this.eventsBase.mutation[storeKey]) {
        this.logEvent(proposedMutate, storeKey, setEvents);
      } else {
        // perform the diff
        if (
          !eventLogIsDifferent(
            {
              mutation: this.eventsBase.mutation[storeKey].mutation,
              // diff: null, //this.eventsBase.mutation[storeKey].diff,
            },
            {
              mutation: mutationStore[storeKey].mutation,
              // diff: null, //mutationStore[storeKey].diff,
            },
          )
        ) {
          this.logEvent(proposedMutate, storeKey, setEvents);
        }
      }
    });
  }

  getDataStore() {
    return this.eventLogData;
  }

  getTempStore() {
    return this.eventsBase;
  }
}

// export default new EventLogContainer(new eventLogDataObject());

export default (LogObject: EventLogDataObject): EventLogContainer => {
  return new EventLogContainer(LogObject);
};

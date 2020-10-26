import React from 'react';
import {EventBase, MutationStoreValue} from './lib/apollo11types';
import eventLogIsDifferent, {validateOperationName} from './lib/objectDifference';
import EventLogDataObject from './lib/eventLogData';
import EventNode from './lib/eventLogNode';

export type EventLogStore = {
  eventId: string;
  queryManager: {
    mutationStore: Object;
    queriesStore: Object;
  };
  cache?: Object;
  queries?: Object;
  mutations?: Object;
};

export class EventLogContainer {
  _eventsBase: EventBase | undefined;

  _eventLogData: EventLogDataObject | undefined;

  constructor(srceObj?: EventLogDataObject) {
    this._eventLogData = srceObj;
    this._eventsBase = {
      mutation: {},
      query: {},
    };
  }

  logEvent(
    eventNode: EventNode,
    baseId: string,
    setEvents?: React.Dispatch<React.SetStateAction<{}>>,
  ) {
    this._eventLogData.addEventLog(eventNode);
    this._eventsBase[eventNode.content.type][baseId] = eventNode.content.event;
    if (setEvents) {
      // perform the State Hook
      setEvents(() => {
        // preEvents: EventLogDataObject
        return this._eventLogData;
      });
    }
  }

  adjustEventId(evtId, entNum) {
    return `${evtId}.${'0'.repeat(3 - (entNum - 1).toString().length)}${(
      entNum - 1
    ).toString()}`;
  }

  sequenceApolloLog(
    eventLog: EventLogStore,
    setEvents?: React.Dispatch<React.SetStateAction<{}>>,
  ) {
    // console.log('Query Log :: ', eventLog);
    const {
      queryManager: {mutationStore, queriesStore},
      eventId,
      cache,
      queries, mutations
    } = eventLog;
    let evtNum = 0;
    // perform queriesStore Check
    Object.keys(queriesStore).forEach(storeKey => {
      const proposedQry: EventNode = new EventNode({
        event: {
          ...queriesStore[storeKey],
          'variables': queriesStore[storeKey].variables ? queriesStore[storeKey].variables : queries && queries.hasOwnProperty(storeKey) && queries[storeKey].variables ? queries[storeKey].variables : {},
          request: {
            operation: {
              operationName:
                validateOperationName(queriesStore[storeKey].document.definitions, 'Query'),
              query: queriesStore[storeKey].document.loc.source.body,
            },
          },
          response: {},
        },
        type: 'query',
        eventId: this.adjustEventId(eventId, (evtNum += 1)),
        cache,
      });
      // console.log('Proposed Query Snapshot :: ', proposedQry);
      if (!this._eventsBase.query[storeKey]) {
        this.logEvent(proposedQry, storeKey, setEvents);
      } else {
        // perform the diff
        if (
          !eventLogIsDifferent(
            {
              document: this._eventsBase.query[storeKey].document,
              variables: this._eventsBase.query[storeKey].variables,
              // diff: null, //this.eventsBase.query[storeKey].diff,
            },
            {
              document: queriesStore[storeKey].document,
              variables: queriesStore[storeKey].variables ? queriesStore[storeKey].variables : queries && queries.hasOwnProperty(storeKey) && queries[storeKey].variables ? queries[storeKey].variables : {},
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
      // console.log('Mutation Snapshot :: ', mutationStore[storeKey]);
      const proposedMutate: EventNode = new EventNode({
        event: {
          ...mutationStore[storeKey],
          'variables': mutationStore[storeKey].variables ? mutationStore[storeKey].variables : mutations && mutations.hasOwnProperty(storeKey) && mutations[storeKey].variables ? mutations[storeKey].variables : {},
          'loading': mutationStore[storeKey].loading ? mutationStore[storeKey].loading : mutations && mutations.hasOwnProperty(storeKey) && mutations[storeKey].loading ? mutations[storeKey].loading : {},
          'error': mutationStore[storeKey].variables ? mutationStore[storeKey].error : mutations && mutations.hasOwnProperty(storeKey) && mutations[storeKey].error ? mutations[storeKey].error : {},
          request: {
            operation: {
              operationName:
                validateOperationName(mutationStore[storeKey].mutation.definitions, 'Mutation'),
              query: mutationStore[storeKey].mutation.loc.source.body,
            },
          },
          response: {},
        },
        type: 'mutation',
        eventId: this.adjustEventId(eventId, (evtNum += 1)),
        cache,
      });
      // console.log('Proposed Mutation Snapshot :: ', proposedMutate);
      if ((proposedMutate.content.event as MutationStoreValue).loading) {
        return;
      }
      if (!this._eventsBase.mutation[storeKey]) {
        this.logEvent(proposedMutate, storeKey, setEvents);
      } else {
        // perform the diff
        if (
          !eventLogIsDifferent(
            {
              mutation: this._eventsBase.mutation[storeKey].mutation,
              variables: this._eventsBase.mutation[storeKey].variables,
              loading: this._eventsBase.mutation[storeKey].loading,
              error: this._eventsBase.mutation[storeKey].error,
              // diff: null, //this.eventsBase.mutation[storeKey].diff,
            },
            {
              mutation: mutationStore[storeKey].mutation,
              variables: mutationStore[storeKey].variables ? mutationStore[storeKey].variables : mutations && mutations.hasOwnProperty(storeKey) && mutations[storeKey].variables ? mutations[storeKey].variables : {},
              loading: mutationStore[storeKey].loading ? mutationStore[storeKey].loading : mutations && mutations.hasOwnProperty(storeKey) && mutations[storeKey].loading ? mutations[storeKey].loading : {},
              error: mutationStore[storeKey].error ? mutationStore[storeKey].error : mutations && mutations.hasOwnProperty(storeKey) && mutations[storeKey].error ? mutations[storeKey].error : {},
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
    return this._eventLogData;
  }

  getTempStore() {
    return this._eventsBase;
  }
}

// export default new EventLogContainer(new eventLogDataObject());

export default (LogObject: EventLogDataObject): EventLogContainer => {
  return new EventLogContainer(LogObject);
};

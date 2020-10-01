import React from 'react';

import EventIcon from '@material-ui/icons/Event';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import {EventLogProps} from '../utils/managedlog/lib/eventLogData';

const EventLog = ({eventLog, handleEventChange}: EventLogProps) => {
  return (
    <div>
      {/* <h1>Event Log</h1> */}
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        // subheader={
        //   <ListSubheader component="div" id="nested-list-subheader">
        //     Event Log
        //   </ListSubheader>
        // }
      >
        {eventLog.eventLength ? (
          eventLog.map((eventNode: any): any => {
            // DoubleLinkedList Impementation of thee EventLog
            const {
              content: {event, eventId},
            } = eventNode; // destructure event and eventID from content node of linkedList

            const eventString = eventId.toString();

            // if statement to handle key of 0 and undefined
            if (
              event === 0 ||
              event === undefined ||
              event === 'undefined' ||
              event === 'queryIdCounter' ||
              event === 'mutationIdCounter' ||
              event === 'requestIdCounter' ||
              event === 'idCounter' ||
              event === 'lastEventId' ||
              !event ||
              event === '0' ||
              eventString === '0'
              // !eventLog[event].request
            ) {
              // if key is 0 or undefined, just log it to the console and return so the next lines of code don't run
              return console.log('Event === undefined', event);
            }

            return (
              <ListItem
                button
                key={`${eventString}${0}`}
                onClick={() => handleEventChange(eventNode)}>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary={event.request.operation.operationName} />
              </ListItem>
            );
          })
        ) : (
          <></>
        )}
        {/* {Object.keys(eventLog).map((event: any) => {
          // Object Impementation of thee EventLog
          // This might not be required, this is to ensure the event key is a string
          // However, this should be a string anyway
          const eventString = event.toString();

          // console.log('Event is :>> ', event);
          // console.log('Eventlog[event] is :>> ', eventLog[event]);

          // if statement to handle key of 0 and undefined
          if (
            event === 0 ||
            event === undefined ||
            event === 'undefined' ||
            event === 'queryIdCounter' ||
            event === 'mutationIdCounter' ||
            event === 'requestIdCounter' ||
            event === 'idCounter' ||
            event === 'lastEventId' ||
            !event ||
            event === '0' ||
            eventString === '0'
            // !eventLog[event].request
          ) {
            // if key is 0 or undefined, just log it to the console and return so the next lines of code don't run
            return console.log('Event === undefined', event);
          }

          return (
            <ListItem
              button
              key={event}
              onClick={() => handleEventChange(event)}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText
                primary={eventLog[event].request.operation.operationName}
              />
            </ListItem>
          );
        })} */}
      </List>
    </div>
  );
};

export default EventLog;

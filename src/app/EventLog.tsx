import React from 'react';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import EventIcon from '@material-ui/icons/Event';

type EventLogProps = {
  eventLog: any;
  handleEventChange: any;
};

const EventLog = ({eventLog, handleEventChange}: EventLogProps) => {
  return (
    <div>
      <h1>Event Log</h1>

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Event Log
          </ListSubheader>
        }>
        {Object.keys(eventLog).map((event: any) => {
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
        })}
      </List>
    </div>
  );
};

export default EventLog;

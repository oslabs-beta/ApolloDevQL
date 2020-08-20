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
  const [open, setOpen] = React.useState(true);
  const [activeEvent, setActiveEvent] = React.useState('');

  const handleClick = (e: any) => {
    setOpen(!open);
    console.log('*********Target clicked===*********', e);
    setActiveEvent(e);
  };

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
          const eventString = event.toString();
          // console.log('EVENT======', eventString, event);
          // console.log('eventLog=======', eventLog);

          if (
            event === 0 ||
            event === undefined ||
            event === 'undefined' ||
            !event ||
            event === '0' ||
            eventString === '0'
          ) {
            return console.log('Event === undefined', event);
          }
          // console.log('Event not undefined', event);

          // console.log(
          //   'eventLog[event].operation.operationName====',
          //   eventLog[event].operation.operationName,
          // );
          return (
            <ListItem
              button
              key={event}
              onClick={() => handleEventChange(event)}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary={eventLog[event].operation.operationName} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default EventLog;

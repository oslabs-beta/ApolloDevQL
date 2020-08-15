import React from 'react';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import EventIcon from '@material-ui/icons/Event';

type EventLogProps = {
  eventLog: any;
};

const EventLog = ({eventLog}: EventLogProps) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
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
          if (
            eventString === 'undefined' ||
            eventString === undefined ||
            event === undefined ||
            event === 'undefined'
          ) {
            return console.log('Event is undefined===', event);
          }
          return (
            <ListItem button key={event} onClick={handleClick}>
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

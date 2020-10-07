import React from 'react';
// Material UI
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
// Project Props
import {EventLogProps} from '../utils/managedlog/lib/eventLogData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      fontSize: '16px',
      fontWeight: 900,
    },
    iconDiv: {
      minWidth: '30px',
    },
  }),
);

const EventLog = ({eventLog, handleEventChange}: EventLogProps) => {
  const classes = useStyles();

  return (
    <div>
      <List component="nav" aria-labelledby="nested-list-subheader">
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
              return undefined; // console.log('Event === undefined', event);
            }

            return (
              <ListItem
                button
                key={`${eventString}${0}`}
                onClick={() => handleEventChange(eventNode)}>
                <ListItemIcon className={classes.iconDiv}>
                  {/* Show a Q or M based on query or mutation */}
                  {eventNode.content.type === 'query' ? (
                    <Avatar className={classes.smallAvatar}>Q</Avatar>
                  ) : (
                    ''
                  )}
                  {eventNode.content.type === 'mutation' ? (
                    <Avatar className={classes.smallAvatar}>M</Avatar>
                  ) : (
                    ''
                  )}
                </ListItemIcon>
                <ListItemText primary={event.request.operation.operationName} />
              </ListItem>
            );
          })
        ) : (
          <></>
        )}
      </List>
    </div>
  );
};

export default EventLog;

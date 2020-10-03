import React from 'react';
import ReactJson from 'react-json-view';
import Typography from '@material-ui/core/Typography';

import {EventDetailsProps} from '../utils/managedlog/lib/eventLogNode';
import {Apollo11ThemeContext} from '../Panel/themes/ThemeProvider';

const EventDetails = ({activeEvent}: EventDetailsProps) => {
  const {isDark} = React.useContext(Apollo11ThemeContext);

  if (activeEvent === null) return <></>;
  const {
    content: {event},
  } = activeEvent; // eventId
  const {
    request: {
      operation: {operationName, query},
    },
  } = event;
  const {variables} = event;
  return (
    <div>
      {event ? (
        <div>
          <Typography align="left">
            <ReactJson
              name="operation"
              src={{
                operationName,
                query,
                variables,
              }}
              theme={isDark ? 'bright' : 'rjv-default'}
            />
            <ReactJson name="response" src={event.response} />
          </Typography>
        </div>
      ) : (
        <div>No event selected</div>
      )}
    </div>
  );
};

export default EventDetails;

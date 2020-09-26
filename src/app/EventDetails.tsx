import React from 'react';
import ReactJson from 'react-json-view';
import Typography from '@material-ui/core/Typography';

import {EventDetailsProps} from './utils/managedlog/lib/eventLogNode';

const EventDetails = ({activeEvent}: EventDetailsProps) => {
  if (activeEvent === null) return <></>;
  const {
    content: {event},
  } = activeEvent; // eventId
  return (
    <div>
      <h1>Event Details</h1>
      {/* <h2>{eventId}</h2> */}
      {event ? (
        <div>
          <Typography align="left">
            <h3>Operation</h3>
            <ReactJson
              name="operation"
              src={event.request.operation}
              collapsed
            />
            <h3>Response</h3>
            <ReactJson name="response" src={event.response} collapsed />
          </Typography>
        </div>
      ) : (
        <div>No event selected</div>
      )}
    </div>
  );
};

export default EventDetails;

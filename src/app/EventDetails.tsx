import React from 'react';
import ReactJson from 'react-json-view';
import Typography from '@material-ui/core/Typography';

type EventDetailsProps = {
  eventLog: any;
  activeEvent: string;
};

const EventDetails = ({activeEvent, eventLog}: EventDetailsProps) => {
  return (
    <div>
      <h1>Event Details</h1>
      <h2>{activeEvent}</h2>
      {eventLog[activeEvent] ? (
        <div>
          <Typography align="left">
            <h3>Operation</h3>
            <ReactJson
              name="operation"
              src={eventLog[activeEvent].request.operation}
              collapsed
            />
            <h3>Response</h3>
            <ReactJson
              name="response"
              src={eventLog[activeEvent].response}
              collapsed
            />
          </Typography>
        </div>
      ) : (
        <div>No event selected</div>
      )}
    </div>
  );
};

export default EventDetails;

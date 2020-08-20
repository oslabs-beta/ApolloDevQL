import React from 'react';
import ReactJson from 'react-json-view';

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
          <h3>Operation</h3>
          <ReactJson src={eventLog[activeEvent].operation} collapsed />
          <h3>Response</h3>
          <ReactJson src={eventLog[activeEvent].response} collapsed />
        </div>
      ) : (
        <div>No event selected</div>
      )}
    </div>
  );
};

export default EventDetails;

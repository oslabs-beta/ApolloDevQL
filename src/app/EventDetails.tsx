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
      <ReactJson src={eventLog[activeEvent]} />
    </div>
  );
};

export default EventDetails;

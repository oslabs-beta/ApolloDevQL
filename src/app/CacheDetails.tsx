import React from 'react';
import ReactJson from 'react-json-view';

type CacheDetailsProps = {
  eventLog: any;
  activeEvent: string;
};

const CacheDetails = ({activeEvent, eventLog}: CacheDetailsProps) => {
  return (
    <div>
      <h1>Cache Details</h1>
      <ReactJson src={eventLog[activeEvent]} />
    </div>
  );
};

export default CacheDetails;

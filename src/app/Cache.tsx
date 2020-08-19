import React from 'react';
import ReactJson from 'react-json-view';

type CacheProps = {
  eventLog: any;
  activeEvent: string;
  toggleCacheDetails: any;
};

const Cache = ({activeEvent, eventLog, toggleCacheDetails}: CacheProps) => {
  return (
    <div>
      <h1>Current Cache</h1>
      <button
        type="button"
        onClick={() => {
          toggleCacheDetails();
        }}>
        Show Cache Details
      </button>
      <ReactJson src={eventLog[activeEvent]} />
    </div>
  );
};

export default Cache;

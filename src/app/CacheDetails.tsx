import React from 'react';
import ReactJson from 'react-json-view';

type CacheDetailsProps = {
  eventLog: any;
  activeEvent: string;
  activeCache: any;
};

const CacheDetails = ({
  activeEvent,
  activeCache,
  eventLog,
}: CacheDetailsProps) => {
  return (
    <div>
      <h1>Cache Details</h1>

      {eventLog[activeEvent] ? (
        <div>
          <ReactJson
            name={false}
            src={eventLog[activeEvent].cache[activeCache]}
          />
        </div>
      ) : (
        <div>No cache item selected</div>
      )}
    </div>
  );
};

export default CacheDetails;

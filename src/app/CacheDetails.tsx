import React from 'react';
import ReactJson from 'react-json-view';
import Typography from '@material-ui/core/Typography';

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
          <Typography align="left">
            <ReactJson
              name={false}
              src={eventLog[activeEvent].cache[activeCache]}
            />
          </Typography>
        </div>
      ) : (
        <div>No cache item selected</div>
      )}
    </div>
  );
};

export default CacheDetails;

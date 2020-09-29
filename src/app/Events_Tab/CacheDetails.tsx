import React from 'react';
import ReactJson from 'react-json-view';
import Typography from '@material-ui/core/Typography';

import {CacheDetailsProps} from '../utils/managedlog/lib/eventLogNode';

const CacheDetails = ({activeEvent, activeCache}: CacheDetailsProps) => {
  if (activeEvent === null) return <></>;
  const {
    content: {event, cache},
  } = activeEvent;
  return (
    <div>
      <h1>Cache Details</h1>
      {event ? (
        <div>
          <Typography align="left">
            <ReactJson name={false} src={cache[activeCache]} />
          </Typography>
        </div>
      ) : (
        <div>No cache item selected</div>
      )}
    </div>
  );
};

export default CacheDetails;

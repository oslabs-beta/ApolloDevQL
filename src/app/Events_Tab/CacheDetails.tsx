import React from 'react';
import ReactJson from 'react-json-view';
import Typography from '@material-ui/core/Typography';

import {CacheDetailsProps} from '../utils/managedlog/lib/eventLogNode';
import {Apollo11ThemeContext} from '../Panel/themes/ThemeProvider';

const CacheDetails = ({activeEvent, activeCache}: CacheDetailsProps) => {
  const {isDark} = React.useContext(Apollo11ThemeContext);

  if (activeEvent === null) return <></>;
  const {
    content: {event, cache},
  } = activeEvent;
  return (
    <div>
      {event ? (
        <div>
          <Typography align="left">
            <ReactJson
              name={false}
              src={cache[activeCache]}
              theme={isDark ? 'bright' : 'rjv-default'}
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

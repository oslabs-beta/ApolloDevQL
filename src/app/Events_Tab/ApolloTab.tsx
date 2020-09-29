import React, {useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {ApolloTabProps} from '../utils/managedlog/lib/eventLogData';
import Cache from './Cache';
import CacheDetails from './CacheDetails';
import EventLog from './EventLog';
import EventDetails from './EventDetails';
import EventNode from '../utils/managedlog/lib/eventLogNode';

// interface Props extends StyledComponentProps<ClassKeyOfStyles<typeof styles>> {
//   myProp: string;
// }

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    grid: {
      borderStyle: 'solid',
      height: '100vh',
    },
    eventDetails: (props: any) => ({
      height: props.eventDetailsHeight,
      borderStyle: 'solid',
    }),
    cacheDetails: {
      borderStyle: 'solid',
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

function ApolloTab({eventLog}: ApolloTabProps) {
  const classes = useStyles();
  const [cacheDetailsVisible, setCacheDetailsVisible] = useState(() => false);
  const [activeEvent, setActiveEvent] = useState(
    (): EventNode => {
      return eventLog.eventHead;
    },
  );
  const [activeCache, setActiveCache] = useState(() => ({}));

  // Function to change the active event key to pass active event to components
  const handleEventChange = (e: EventNode) => {
    setActiveEvent(e);
  };

  // Function to change the active cache key to pass to components
  const handleCacheChange = (e: any) => {
    setActiveCache(e);
  };

  const props = {eventDetailsHeight: '100%'};

  if (cacheDetailsVisible === true) {
    props.eventDetailsHeight = '50%';
  }

  // Function to toggle whether the expanded cache details are visible or hidden
  const handleCacheSelection = (): void => {
    setCacheDetailsVisible(!cacheDetailsVisible);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={4} className={classes.grid}>
          <Paper className={classes.paper}>
            <EventLog
              eventLog={eventLog}
              handleEventChange={handleEventChange}
            />
          </Paper>
        </Grid>

        <Grid
          item
          xs={4}
          className={classes.grid}
          container
          direction="row"
          justify="center">
          <Grid item xs={12} className={classes.eventDetails}>
            <Paper className={classes.paper}>
              <EventDetails activeEvent={activeEvent} />
            </Paper>
          </Grid>

          {cacheDetailsVisible && (
            <Grid item xs={12} className={classes.cacheDetails}>
              <Paper className={classes.paper}>
                <CacheDetails
                  activeCache={activeCache}
                  activeEvent={activeEvent}
                />
              </Paper>
            </Grid>
          )}
        </Grid>

        <Grid item xs={4} className={classes.grid}>
          <Paper className={classes.paper} variant="outlined">
            <Cache
              toggleCacheDetails={handleCacheSelection}
              activeEvent={activeEvent}
              handleCacheChange={handleCacheChange}
              cacheDetailsVisible={cacheDetailsVisible}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ApolloTab;

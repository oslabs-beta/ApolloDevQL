import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {ApolloTabProps} from '../utils/managedlog/lib/eventLogData';
import Cache from './Cache';
import CacheDetails from './CacheDetails';
import EventLog from './EventLog';
import EventDetails from './EventDetails';
import EventPanel from './EventPanel';
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
      height: '100vh',
      width: '58%',
      marginLeft: '1%',
      boxShadow: '1px 1px 1px #fff',
      borderRadius: '1px',
    },
    gridContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    cacheDetails: {
      borderStyle: 'solid',
    },
    cacheGrid: {
      height: '100vh',
      boxShadow: '1px 1px 1px #fff',
      borderRadius: '1px',
    },
    paper: {
      color: theme.palette.text.secondary,
      height: '100vh',
      overflowY: 'auto',
    },
    tabPaper: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function ApolloTab({eventLog}: ApolloTabProps) {
  const classes = useStyles();
  // const [cacheDetailsVisible, setCacheDetailsVisible] = useState(() => false);
  const [activeEvent, setActiveEvent] = useState(
    (): EventNode => {
      return eventLog.eventHead;
    },
  );
  const [activeCache, setActiveCache] = useState(() => ({}));

  const [tabValue, setTabValue] = useState(() => 0);

  // Function to change the active event key to pass active event to components
  const handleEventChange = (e: EventNode) => {
    setActiveEvent(e);
  };

  const handleTabChange = (event: any, value: any) => {
    setTabValue(value);
  };

  // Function to change the active cache key to pass to components
  const handleCacheChange = (e: any) => {
    setActiveCache(e);
  };

  return (
    <Grid className={classes.gridContainer}>
      <Grid item xs={3} className={classes.grid}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="subtitle1" color="inherit">
              Event Log
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.paper}>
          <EventLog eventLog={eventLog} handleEventChange={handleEventChange} />
        </Paper>
      </Grid>

      <Grid
        item
        xs={9}
        className={classes.grid}
        container
        direction="row"
        justify="center">
        <Grid item xs={12} className={classes.grid}>
          <div className={classes.tabPaper}>
            <AppBar position="static">
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Details" />
                <Tab label="Cache" />
              </Tabs>
            </AppBar>
            <EventPanel panelValue={tabValue} panelIndex={0}>
              <Paper className={classes.paper}>
                <EventDetails activeEvent={activeEvent} />
              </Paper>
            </EventPanel>
            <EventPanel panelValue={tabValue} panelIndex={1}>
              <Grid className={classes.gridContainer}>
                <Grid item xs={5} className={classes.cacheGrid}>
                  <Paper className={classes.paper} variant="outlined">
                    <Cache
                      activeEvent={activeEvent}
                      handleCacheChange={handleCacheChange}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={7} className={classes.cacheGrid}>
                  <Paper className={classes.paper}>
                    <CacheDetails
                      activeCache={activeCache}
                      activeEvent={activeEvent}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </EventPanel>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ApolloTab;

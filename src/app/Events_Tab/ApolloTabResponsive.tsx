import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// React Grid Layout
import RGL, {WidthProvider} from 'react-grid-layout';

import {ApolloResponsiveTabProps} from '../utils/managedlog/lib/eventLogData';
import Cache from './Cache';
import CacheDetails from './CacheDetails';
import EventLog from './EventLog';
import EventDetails from './EventDetails';
import EventPanel from './EventPanel';
import EventNode from '../utils/managedlog/lib/eventLogNode';
import {Apollo11ThemeContext} from '../Panel/themes/ThemeProvider';

// interface Props extends StyledComponentProps<ClassKeyOfStyles<typeof styles>> {
//   myProp: string;
// }

// React Grid Layout
const ReactGridLayout = WidthProvider(RGL);

const layoutArray = [
  {i: '1', x: 0, y: 0, w: 3, h: 22},
  {i: '2', x: 3, y: 0, w: 9, h: 22},
];

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      // overflow: 'scroll',
    },
    eventGrid: {
      width: '100%',
      marginLeft: '1%',
      boxShadow: '1px 1px 1px #fff',
      borderRadius: '1px',
      overflow: 'auto',
    },
    mainGrid: {
      width: '100%',
      marginLeft: '1%',
      boxShadow: '1px 1px 1px #fff',
      borderRadius: '1px',
      overflow: 'auto',
    },
    grid: {
      height: '100vh',
      width: '100%',
      marginLeft: '1%',
      boxShadow: '1px 1px 1px #fff',
      borderRadius: '1px',
      // overflow: 'auto',
    },
    gridContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    cacheDetails: {
      borderStyle: 'solid',
      overflow: 'auto',
    },
    cacheGrid: {
      height: '100vh',
      boxShadow: '1px 1px 1px #fff',
      borderRadius: '1px',
      overflow: 'auto',
    },
    paper: {
      color: theme.palette.text.secondary,
      // height: '100vh',
      // 'overflow-y': 'hidden',
      // 'overflow-x': 'auto',
    },
    paperJson: (props: any) => ({
      color: theme.palette.text.secondary,
      height: '100vh',
      overflow: 'auto',
      backgroundColor: props.isDark ? 'black' : '',
    }),
    tabPaper: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function ApolloTabResponsive({
  eventLog,
  isDraggable,
  isResizable,
  items,
  rowHeight,
  cols,
  verticalCompact,
  resizeHandles,
  compactType,
  preventCollision,
  autoSize,
  margin,
}: ApolloResponsiveTabProps) {
  const {isDark} = React.useContext(Apollo11ThemeContext);
  const classes = useStyles({isDark});
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
    <div>
      <ReactGridLayout
        className="layout"
        layout={layoutArray}
        // onLayoutChange={onLayoutChange}
        isDraggable={isDraggable}
        isResizable={isResizable}
        items={items}
        rowHeight={rowHeight}
        cols={cols}
        verticalCompact={verticalCompact}
        resizeHandles={resizeHandles}
        compactType={compactType}
        preventCollision={preventCollision}
        autoSize={autoSize}
        margin={margin}>
        {/* <Grid item xs={3} className={classes.grid}> */}
        <div
          className={classes.eventGrid}
          key={1}
          data-grid={{i: '1', x: 0, y: 0, w: 4, h: 22}}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="subtitle1" color="inherit">
                Event Log
              </Typography>
            </Toolbar>
          </AppBar>

          <Paper className={classes.paper}>
            <EventLog
              eventLog={eventLog}
              handleEventChange={handleEventChange}
            />
          </Paper>
        </div>
        {/* </Grid> */}

        <div
          className={classes.mainGrid}
          key={2}
          data-grid={{i: '2', x: 4, y: 0, w: 8, h: 22}}>
          {/* <div
        className={classes.grid}
        key={2}
        data-grid={{i: '2', x: 2, y: 0, w: 10, h: 20}}> */}

          <Grid item xs={12} className={classes.grid}>
            <div className={classes.tabPaper}>
              <AppBar position="static">
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Details" />
                  <Tab label="Cache" />
                </Tabs>
              </AppBar>

              <EventPanel panelValue={tabValue} panelIndex={0}>
                <Paper className={classes.paperJson}>
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
                    <Paper className={classes.paperJson}>
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
        </div>
      </ReactGridLayout>
    </div>
  );
}

ApolloTabResponsive.defaultProps = {
  isDraggable: true,
  isResizable: true,
  items: 2,
  rowHeight: 22,
  cols: 12,
  verticalCompact: true,
  resizeHandles: ['e', 'ne', 'se'],
  autoSize: true,
  compactType: 'vertical',
  preventCollision: false,
  margin: [10, 10],
};

export default ApolloTabResponsive;

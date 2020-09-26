import React, {useEffect} from 'react';
// Material UI Components
import {
  makeStyles,
  createStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
// Project files
import {extractOperationName} from './utils/helper';
import {getMaxEventTime} from './utils/performanceMetricsCalcs';
import TracingDetails from './TracingDetails';
import progressBarStyle from './progressBar';

interface IPerformanceData {
  events: any;
}

interface ITimings {
  [timings: string]: any;
}

// create event progress bar
const BorderLinearProgress = progressBarStyle('#1876D2');
// const BorderLinearProgress = withStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       height: 10,
//       borderRadius: 5,
//     },
//     colorPrimary: {
//       backgroundColor:
//         theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
//     },
//     bar: {
//       borderRadius: 5,
//       backgroundColor: '#1876D2',
//     },
//   }),
// )(LinearProgress);

// setup component class hook
const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    grid: {
      borderStyle: 'solid',
      height: '100vh',
      size: '2px',
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
    titles: {
      textAlign: 'center',
    },
  }),
);

function Performance({events}: IPerformanceData) {
  const componentClass = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [timingsInfo, setTimingsInfo] = React.useState(
    (): ITimings => ({timings: ''}),
  );
  const [tracingInfo, setTracingInfo] = React.useState({});
  const [maxEventTime, setMaxEventTime] = React.useState(
    getMaxEventTime(events),
  );

  useEffect(() => {
    console.log('events', events);
    setMaxEventTime(getMaxEventTime(events));
  }, [events]);

  const handleListItemClick = (event: any, index: number, key: string) => {
    if (events[key]) {
      let payload = events[key];
      if (payload && payload.response && payload.response.content) {
        // first level safety check
        payload = payload.response.content;
        // TODO Try destructing content deeply from payload
        // const {content = payload.reponse.content} = payload;
        if (!(payload && payload.extensions && payload.extensions.tracing)) {
          // let use know they need to activate Tracing Data when ApolloServer was instantiated on their server
          // events[key].time
          setTimingsInfo({timings: events[key].time});
        } else {
          // TODO Try destructing deeply nested
          const {duration, endTime, startTime} = payload.extensions.tracing;
          const tracingData = {
            key,
            duration,
            endTime,
            startTime,
            resolvers: payload.extensions.tracing.execution.resolvers,
          };
          // need to transform resolvers in Array
          // TODO: Transform resolvers ordering by startOffset and hopeful format to show in the details list on a waterfall model
          setTracingInfo(tracingData);
        }
      }
    }
    setSelectedIndex(index);
  };

  const formatTime = (time: number) => {
    let formattedTime = time;
    if (formattedTime < 1000) return `${formattedTime} ns`;

    formattedTime = Math.floor(formattedTime / 1000);
    if (formattedTime < 1000) return `${formattedTime} µs`;

    formattedTime = Math.floor(formattedTime / 1000);
    return `${formattedTime} ms`;
  };

  const formatTimeForProgressBar = (time: number): number => {
    let formattedTime = time;
    if (formattedTime < 1000) return formattedTime;

    formattedTime = Math.floor(formattedTime / 1000);
    if (formattedTime < 1000) return formattedTime;

    formattedTime = Math.floor(formattedTime / 1000);
    return formattedTime;
  };

  const TimeMagnitude = (time: number): string => {
    let formattedTime = time;
    if (formattedTime < 1000) return 'ns';

    formattedTime = Math.floor(formattedTime / 1000);
    if (formattedTime < 1000) return 'µs';

    formattedTime = Math.floor(formattedTime / 1000);
    return 'ms';
  };

  const renderTracingDetails = (tracing: any): React.ReactNode => {
    // Create list of Reducers for each magnitude of time
    const nsResolvers = tracing.resolvers
      .filter(resolver => TimeMagnitude(resolver.duration) === 'ns')
      .sort((a, b) => b.duration - a.duration);

    const µsResolvers = tracing.resolvers
      .filter(resolver => TimeMagnitude(resolver.duration) === 'µs')
      .sort((a, b) => b.duration - a.duration);

    const msResolvers = tracing.resolvers
      .filter(resolver => TimeMagnitude(resolver.duration) === 'ms')
      .sort((a, b) => b.duration - a.duration);

    // Find max of each Magnitude
    const nsResolversMax =
      nsResolvers.length > 0
        ? nsResolvers.reduce((acc, curr) => {
            if (acc < curr.duration) {
              return curr.duration;
            }

            return acc;
          }, 0)
        : null;

    const µsResolversMax =
      µsResolvers.length > 0
        ? µsResolvers.reduce((acc, curr) => {
            if (acc < curr.duration) {
              return curr.duration;
            }

            return acc;
          }, 0)
        : null;

    const msResolversMax =
      msResolvers.length > 0
        ? msResolvers.reduce((acc, curr) => {
            if (acc < curr.duration) {
              return curr.duration;
            }

            return acc;
          }, 0)
        : null;

    return (
      <List component="nav" aria-label="main mailbox folders" dense>
        <ListItem key={tracing.key}>
          <ListItemText
            primary={`Total Resolver Time: ${formatTime(tracing.duration)}`}
          />
        </ListItem>
        <div>
          <BorderLinearProgress variant="determinate" value={100} />
        </div>
        <h1>Individual Resolver Times</h1>
        <h3>Millisecond Resolvers 10^−3</h3>
        {msResolvers.length !== 0 ? (
          msResolvers.map((resolver: any) => {
            return (
              <div key={resolver.startoffset}>
                <ListItem key={resolver.startoffset}>
                  <ListItemText
                    primary={`${resolver.path.join('.')}: ${formatTime(
                      resolver.duration,
                    )}`}
                  />
                </ListItem>
                <BorderLinearProgress
                  variant="determinate"
                  value={
                    (formatTimeForProgressBar(resolver.duration) /
                      formatTimeForProgressBar(msResolversMax)) *
                      100 >
                    1
                      ? (formatTimeForProgressBar(resolver.duration) /
                          formatTimeForProgressBar(msResolversMax)) *
                        100
                      : 1
                  }
                />
              </div>
            );
          })
        ) : (
          <p>No Resolvers at this magnitude</p>
        )}
        <h3>Microsecond Resolvers 10^−6</h3>
        {µsResolvers.length !== 0 ? (
          µsResolvers.map((resolver: any) => {
            return (
              <div key={resolver.startoffset}>
                <ListItem key={resolver.startoffset}>
                  <ListItemText
                    primary={`${resolver.path.join('.')}: ${formatTime(
                      resolver.duration,
                    )}`}
                  />
                </ListItem>
                <BorderLinearProgress
                  variant="determinate"
                  value={
                    (formatTimeForProgressBar(resolver.duration) /
                      formatTimeForProgressBar(tracing.duration)) *
                      100 >
                    1
                      ? (formatTimeForProgressBar(resolver.duration) /
                          formatTimeForProgressBar(µsResolversMax)) *
                        100
                      : 1
                  }
                />
              </div>
            );
          })
        ) : (
          <p>No Resolvers at this magnitude</p>
        )}
        <h3>Nanosecond Resolvers 10^−9</h3>
        {nsResolvers.length !== 0 ? (
          nsResolvers.map((resolver: any) => {
            return (
              <div key={resolver.startoffset}>
                <ListItem key={resolver.startoffset}>
                  <ListItemText
                    primary={`${resolver.path.join('.')}: ${formatTime(
                      resolver.duration,
                    )}`}
                  />
                </ListItem>
                <BorderLinearProgress
                  variant="determinate"
                  value={
                    (formatTimeForProgressBar(resolver.duration) /
                      formatTimeForProgressBar(µsResolversMax)) *
                      100 >
                    1
                      ? (formatTimeForProgressBar(resolver.duration) /
                          formatTimeForProgressBar(µsResolversMax)) *
                        100
                      : 0.5
                  }
                />
              </div>
            );
          })
        ) : (
          <p>No Resolvers at this magnitude</p>
        )}
      </List>
    );
  };

  return (
    <div className={componentClass.root}>
      <Grid container spacing={0}>
        <Grid item xs={4} className={componentClass.grid}>
          <h1 className={componentClass.titles}>Events</h1>
          <List component="nav" aria-label="main mailbox folders" dense>
            {Object.entries(events)
              .filter(([, obj]: any) => obj && (obj.response || obj.request))
              .map(([key, obj]: any, k: number) => {
                const newobj = {
                  operation:
                    obj &&
                    obj.request &&
                    obj.request.operation &&
                    obj.request.operation.operationName
                      ? obj.request.operation.operationName
                      : extractOperationName(obj),
                  time: obj.time,
                };

                return (
                  <div key={`div-operation${key}`}>
                    <ListItem
                      key={`operation${key}`}
                      className={`${componentClass.root}`}
                      selected={selectedIndex === k}
                      onClick={event => handleListItemClick(event, k, key)}>
                      <ListItemText
                        primary={`${newobj.operation} ${Math.floor(
                          newobj.time,
                        )} ms`}
                      />
                    </ListItem>
                    <BorderLinearProgress
                      variant="determinate"
                      value={(newobj.time / maxEventTime) * 100}
                    />
                  </div>
                );
              })}
          </List>
        </Grid>
        <Grid item xs={8} className={componentClass.grid}>
          <h1 className={componentClass.titles}>Tracing Details</h1>
          {Object.keys(tracingInfo).length ? (
            // ? renderTracingDetails(tracingInfo)
            <TracingDetails tracing={tracingInfo} />
          ) : (
            <p className={componentClass.titles}>
              Create some events in your app
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
export default Performance;

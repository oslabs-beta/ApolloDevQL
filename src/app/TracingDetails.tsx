import React, {useEffect} from 'react';
// material UI components
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
import Alert from '@material-ui/lab/Alert';
// project files
import progressBarStyle from './progressBar';
import {
  formatTime,
  formatTimeForProgressBar,
  TimeMagnitude,
  filterSortResolvers,
} from './tracingTimeFormating';

// styles for each progress bar color
const BorderLinearProgress = progressBarStyle('#1876D2');
const BorderLinearProgressLongest = progressBarStyle('#F44335');
const BorderLinearProgressMedium = progressBarStyle('#FF9800');
const BorderLinearProgressShortest = progressBarStyle('#2296F3');

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

// const BorderLinearProgressLongest = withStyles((theme: Theme) =>
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
//       backgroundColor: '#F44335',
//     },
//   }),
// )(LinearProgress);

// const BorderLinearProgressMedium = withStyles((theme: Theme) =>
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
//       backgroundColor: '#FF9800',
//     },
//   }),
// )(LinearProgress);

// const BorderLinearProgressShortest = withStyles((theme: Theme) =>
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
//       backgroundColor: '#2296F3',
//     },
//   }),
// )(LinearProgress);

// style for alerts
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alerts: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    titles: {
      textAlign: 'center',
    },
  }),
);

// The Time Functions
// const formatTime = (time: number) => {
//   let formattedTime = time;
//   if (formattedTime < 1000) return `${formattedTime} ns`;

//   formattedTime = Math.floor(formattedTime / 1000);
//   if (formattedTime < 1000) return `${formattedTime} µs`;

//   formattedTime = Math.floor(formattedTime / 1000);
//   return `${formattedTime} ms`;
// };

// const formatTimeForProgressBar = (time: number): number => {
//   let formattedTime = time;
//   if (formattedTime < 1000) return formattedTime;

//   formattedTime = Math.floor(formattedTime / 1000);
//   if (formattedTime < 1000) return formattedTime;

//   formattedTime = Math.floor(formattedTime / 1000);
//   return formattedTime;
// };

// const TimeMagnitude = (time: number): string => {
//   let formattedTime = time;
//   if (formattedTime < 1000) return 'ns';

//   formattedTime = Math.floor(formattedTime / 1000);
//   if (formattedTime < 1000) return 'µs';

//   formattedTime = Math.floor(formattedTime / 1000);
//   return 'ms';
// };

type TracingDetailProps = {
  tracing: any;
};

// Start of component
const TracingDetails = ({tracing}: TracingDetailProps) => {
  const classes = useStyles();

  // Create list of Reducers for each magnitude of time
  const nsResolvers = filterSortResolvers(tracing.resolvers, 'ns');
  const µsResolvers = filterSortResolvers(tracing.resolvers, 'µs');
  const msResolvers = filterSortResolvers(tracing.resolvers, 'ms');

  // const nsResolvers = tracing.resolvers
  //   .filter(resolver => TimeMagnitude(resolver.duration) === 'ns')
  //   .sort((a, b) => b.duration - a.duration);

  // const µsResolvers = tracing.resolvers
  //   .filter(resolver => TimeMagnitude(resolver.duration) === 'µs')
  //   .sort((a, b) => b.duration - a.duration);

  // const msResolvers = tracing.resolvers
  //   .filter(resolver => TimeMagnitude(resolver.duration) === 'ms')
  //   .sort((a, b) => b.duration - a.duration);

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
      <Divider />
      <h1 className={classes.titles}>Individual Resolver Times</h1>
      <Divider style={{margin: '30px'}} />
      <div className={classes.alerts}>
        <Alert variant="filled" severity="error">
          <b>Longest:</b> Millisecond Resolvers 10^−3
        </Alert>
      </div>
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
              <BorderLinearProgressLongest
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
      <Divider style={{margin: '30px'}} />
      <div className={classes.alerts}>
        <Alert variant="filled" severity="warning">
          <b>Medium:</b> Microsecond Resolvers 10^−6
        </Alert>
      </div>
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
              <BorderLinearProgressMedium
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
      <Divider style={{margin: '30px'}} />
      <div className={classes.alerts}>
        <Alert variant="filled" severity="info">
          <b>Shortest:</b> Nanosecond Resolvers 10^−9
        </Alert>
      </div>
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
              <BorderLinearProgressShortest
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

export default TracingDetails;

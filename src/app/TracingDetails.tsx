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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

// project files
import progressBarStyle from './progressBar';
import ArrowChip from './ArrowChip';
import {
  formatTime,
  formatTimeForProgressBar,
  TimeMagnitude,
  filterSortResolvers,
<<<<<<< HEAD
} from './utils/tracingTimeFormating';
=======
  createResolversArray,
} from './utils/tracingTimeFormating';
import {flexbox} from '@material-ui/system';
>>>>>>> 330cf5875f558853f5042412a9ded5c07d72b87f

// styles for each progress bar color
// const BorderLinearProgress = progressBarStyle('#1876D2');
const BordereLinearProgressTotal = progressBarStyle('#4BAF50');
const BorderLinearProgressLongest = progressBarStyle('#F44335');
const BorderLinearProgressMedium = progressBarStyle('#FF9800');
const BorderLinearProgressShortest = progressBarStyle('#2296F3');

// style for alerts
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alerts: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },

    topAlert: {
      width: '100%',
      paddingLeft: '5px',
      paddingRight: '5px',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },

    titles: {
      textAlign: 'center',
      marginTop: '10px',
      marginBottom: '10px',
    },
    cards: {
      backgroundColor: '#F7E4CE',
      marginLeft: '5px',
      marginRight: '5px',
      marginTop: '15px',
    },

    divider: {
      margin: '10px',
    },
    defaultStateTopSection: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
    },
  }),
);

type TracingDetailProps = {
  tracing: any;
  eventSelected: boolean;
};

// Start of component
const TracingDetails = ({tracing, eventSelected}: TracingDetailProps) => {
  const classes = useStyles();

  const resolversArray = createResolversArray(tracing);

  // Create list of Reducers for each magnitude of time
  const nsResolvers = filterSortResolvers(resolversArray, 'ns');
  const µsResolvers = filterSortResolvers(resolversArray, 'µs');
  const msResolvers = filterSortResolvers(resolversArray, 'ms');

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
      {eventSelected ? (
        <div className={classes.topAlert}>
          <Alert variant="filled" severity="success">
            <b>Total</b> Resolver Time:
          </Alert>

          <ListItem key={tracing.key}>
            <ListItemText primary={`Total: ${formatTime(tracing.duration)}`} />
          </ListItem>
          <div>
            <BordereLinearProgressTotal variant="determinate" value={100} />
          </div>
        </div>
      ) : (
        <ArrowChip />
      )}
      <Divider />
      <h1 className={classes.titles}>Individual Resolver Times</h1>
      {/* <Divider className={classes.divider} /> */}

      <Card className={classes.cards}>
        <CardContent>
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
                      primary={`${resolver.path}: ${formatTime(
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
            <ArrowChip />
          )}
        </CardContent>
      </Card>
      {/* <Divider className={classes.divider} /> */}
      <Card className={classes.cards}>
        <CardContent>
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
                      primary={`${resolver.path}: ${formatTime(
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
            <ArrowChip />
          )}
        </CardContent>
      </Card>
      {/* <Divider className={classes.divider} /> */}
      <Card className={classes.cards}>
        <CardContent>
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
                      primary={`${resolver.path}: ${formatTime(
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
            <ArrowChip />
          )}
        </CardContent>
      </Card>
    </List>
  );
};

export default TracingDetails;

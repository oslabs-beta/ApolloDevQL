import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
// import useClientEventlogs from './utils/useClientEventlogs';

import {extractOperationName} from './utils/helper';

interface IPerformanceData {
  events: any;
}

interface ITimings {
  [timings: string]: any;
}

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
  }),
);

function Performance({events}: IPerformanceData) {
  const componentClass = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [timingsInfo, setTimingsInfo] = React.useState(
    (): ITimings => ({timings: ''}),
  );
  const [tracingInfo, setTracingInfo] = React.useState({});

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
          console.log('Go utilize this tracing Data :: ', tracingData);
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

  const renderTracingDetails = (tracing: any): React.ReactNode => {
    return (
      <List component="nav" aria-label="main mailbox folders" dense>
        <ListItem key={tracing.key}>
          <ListItemText
            primary={`Total Resolver Time: ${formatTime(tracing.duration)}`}
          />
        </ListItem>
        <h3>Individual Resolver Times</h3>
        {tracing.resolvers.map((resolver: any) => {
          return (
            <ListItem key={resolver.startoffset}>
              <ListItemText
                primary={`${resolver.path.join('.')}: ${formatTime(
                  resolver.duration,
                )}`}
              />
            </ListItem>
          );
        })}
      </List>
    );
  };

  // console.log('Performance Data :: ', events);
  return (
    <div className={componentClass.root}>
      <Grid container spacing={0}>
        <Grid item xs={4} className={componentClass.grid}>
          <h2>Events</h2>
          <List component="nav" aria-label="main mailbox folders" dense>
            {Object.entries(events)
              .filter(([, obj]: any) => obj && (obj.response || obj.request))
              .map(([key, obj]: any, k: number) => {
                // console.log(
                //   'Pluck Fisrt of above :: ',
                //   extractOperationName(obj),
                // );
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
                );
              })}
          </List>
        </Grid>
        <Grid item xs={8} className={componentClass.grid}>
          <h2>Tracing Details</h2>
          {Object.keys(tracingInfo).length
            ? renderTracingDetails(tracingInfo)
            : ''}
        </Grid>
      </Grid>
    </div>
  );
}
export default Performance;

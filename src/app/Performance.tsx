import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
// import useClientEventlogs from './utils/useClientEventlogs';

import {extractOperationName, transformTimingData} from './utils/helper';

interface IPerformanceData {
  events: any;
}

interface ITimings {
  duration?: any;
  endTime?: any;
  key?: any;
  startTime?: any;
  resolvers?: {[num: number]: any};
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

  const [selectedIndex, setSelectedIndex] = React.useState(() => 0);

  const [tracingInfo, setTracingInfo] = React.useState(
    (): ITimings => ({
      duration: '',
      resolvers: {},
    }),
  );

  const handleListItemClick = (event: any, index: number, key: string) => {
    if (events[key]) {
      const payload = events[key];
      if (payload && payload.response && payload.response.content) {
        // first level safety check

        // using destructured assignment
        const {
          response: {content},
        } = payload;
        if (!(content && content.extensions && content.extensions.tracing)) {
          // let use know they need to activate Tracing Data when ApolloServer was instantiated on their server
          // payload.time
          setTracingInfo({duration: payload.time, resolvers: {}});
        } else {
          // const {duration, endTime, startTime} = payload.extensions.tracing;
          // extract from content using destructured assignment construct
          const {
            extensions: {
              tracing: {
                duration,
                endTime,
                startTime,
                execution: {resolvers},
              },
            },
          } = content;
          // need to transform resolvers in Array
          const tracingData = {
            key,
            duration,
            endTime,
            startTime,
            resolvers: transformTimingData(resolvers, duration),
          };
          // this should be sent to the hook - tracingData
          console.log('Tracing Data :: ', tracingData);
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
    if (tracing.duration === '') return;
    return (
      <List component="nav" aria-label="main mailbox folders" dense>
        <ListItem key={tracing.key}>
          <ListItemText
            primary={`Total Resolver Time: ${formatTime(tracing.duration)}`}
          />
        </ListItem>
        {Object.keys(tracing.resolvers).length ? (
          <h3>Individual Resolver Times</h3>
        ) : (
          <h3>
            Please enabled tracing and cache in your Apollo Server
            initialization to show further network/tracing visualization
          </h3>
        )}
        {Object.keys(tracing.resolvers) // this is already grouped by startOffset hence we need to flatten this back to get a staright data array and then map
          .reduce((flattened, resolverGroup) => {
            tracing.resolvers[resolverGroup].forEach(resolver =>
              flattened.push(resolver),
            );
            return flattened;
          }, [])
          .map((resolver: any) => {
            return (
              <ListItem key={resolver.startoffset}>
                <ListItemText
                  primary={`${resolver.path}: ${formatTime(resolver.duration)}`}
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

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
  const handleListItemClick = (event: any, index: number, key: string) => {
    console.log('Selected Query Event :: ', event, ' with key => ', key);
    setSelectedIndex(index);
  };
  // console.log('Performance Data :: ', events);
  return (
    <div className={componentClass.root}>
      <Grid container spacing={0}>
        <Grid item xs={4} className={componentClass.grid}>
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
                      primary={`${newobj.operation} ${newobj.time}`}
                    />
                  </ListItem>
                );
              })}
          </List>
        </Grid>
        <Grid item xs={8} className={componentClass.grid}>
          <List component="nav" aria-label="main mailbox folders" dense>
            Operation Details List
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
export default Performance;

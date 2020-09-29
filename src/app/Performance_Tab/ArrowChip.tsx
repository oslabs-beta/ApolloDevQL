import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

// style for alerts
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }),
);

const ArrowChip = () => {
  const classes = useStyles();

  return (
    <div className={classes.chip}>
      <Chip
        label="Select a Network Event to see resolver times"
        avatar={
          <Avatar>
            <ArrowBackIcon />
          </Avatar>
        }
        variant="outlined"
      />
    </div>
  );
};

export default ArrowChip;

import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {Apollo11ThemeContext} from '../Panel/themes/ThemeProvider';

// style for alerts
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chipDiv: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    chip: () => ({
      // props: any
      backgroundColor: 'white',
      color: 'black',
    }),
  }),
);

const ArrowChip = () => {
  const {isDark} = React.useContext(Apollo11ThemeContext);
  const classes = useStyles({isDark});

  return (
    <div className={classes.chipDiv}>
      <Chip
        label="Select a Network Event to see resolver times"
        className={classes.chip}
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

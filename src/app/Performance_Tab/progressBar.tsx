import {createStyles, withStyles, Theme} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const progressBar = (color: string) => {
  const progressBar = withStyles((theme: Theme) =>
    createStyles({
      root: {
        height: 10,
        borderRadius: 5,
      },
      colorPrimary: {
        backgroundColor:
          theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
      },
      bar: {
        borderRadius: 5,
        backgroundColor: color,
      },
    }),
  )(LinearProgress);

  return progressBar;
};

export default progressBar;

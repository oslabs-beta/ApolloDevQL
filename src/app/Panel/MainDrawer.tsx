import React, {useState} from 'react';

import clsx from 'clsx';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HttpIcon from '@material-ui/icons/Http';
import StorageIcon from '@material-ui/icons/Storage';
import BarChartIcon from '@material-ui/icons/BarChart';
<<<<<<< HEAD
import Popper, {PopperPlacementType} from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
=======
import MenuIcon from '@material-ui/icons/Menu';
import SwitchUI from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
>>>>>>> 4154d8ad63a28aeb647715470a2a6296ade58740

import ApolloTab from '../Events_Tab/ApolloTab';
import {Apollo11ThemeContext} from './themes/ThemeProvider';
import GraphiQL from '../GraphiQL_Tab/GraphiQLPage';
import {MainDrawerProps} from '../utils/managedlog/lib/eventLogNode';
import Performance from '../Performance_Tab/PerformanceResponsiveTest';

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    hide: {
      display: 'none',
    },
    labelPlacementStart: {
      justifyContent: 'space-between',
    },
    menuButton: {
      marginRight: 36,
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
<<<<<<< HEAD
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    popperText: {
      padding: theme.spacing(2),
    },
    popperPaper: {
      backgroundColor: 'white',
      opacity: 1,
    },
=======
>>>>>>> 4154d8ad63a28aeb647715470a2a6296ade58740
  }),
);

export default function MainDrawer({
  endpointURI,
  events,
  networkEvents,
  networkURI,
}: MainDrawerProps) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('GraphiQL');

<<<<<<< HEAD
  // Hooks for the Popper on hover
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [openPopper, setOpenPopper] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const [popperContent, setPopperContent] = React.useState('');
=======
  const {currentTheme, setTheme} = React.useContext(Apollo11ThemeContext);
  const isDark = Boolean(currentTheme === 'dark');

  const handleThemeChange = event => {
    const {checked} = event.target;
    if (checked) {
      setTheme('dark');
    } else {
      setTheme('normal');
    }
  };
>>>>>>> 4154d8ad63a28aeb647715470a2a6296ade58740

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlePopper = (newPlacement: PopperPlacementType, text: string) => (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setPopperContent(text);
    setAnchorEl(event.currentTarget);
    setOpenPopper(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  /**
   *
   * @param tab Current Selected Tab as String
   * Returns and renders Selected Tab's component as a react Element
   */
  const renderTab = (tab: string): React.ReactElement => {
    switch (tab) {
      case 'GraphiQL':
        return <GraphiQL endpointURI={endpointURI || networkURI} />;
      case 'Events & Cache':
        return <ApolloTab eventLog={events} />;
      case 'Performance':
        return <Performance networkEvents={networkEvents} />;
      default:
        return <GraphiQL endpointURI={endpointURI || networkURI} />;
    }
  };

  return (
    <div className={classes.root}>
      <Popper
        open={openPopper}
        anchorEl={anchorEl}
        placement={placement}
        transition
        style={{opacity: 1}}>
        {({TransitionProps}) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.popperPaper}>
              <Typography className={classes.popperText}>
                {popperContent}
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>

      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Apollo 11
          </Typography>
          <FormControlLabel
            control={<SwitchUI checked={isDark} onChange={handleThemeChange} />}
            label="Theme"
            classes={{
              labelPlacementStart: classes.labelPlacementStart,
            }}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['GraphiQL', 'Events & Cache', 'Performance'].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                setActiveTab(`${text}`);
              }}
              onMouseEnter={handlePopper('right', text)}
              onMouseLeave={handlePopper('right', text)}>
              <ListItemIcon>
                {index === 0 ? <HttpIcon /> : null}
                {index === 1 ? <StorageIcon /> : null}
                {index === 2 ? <BarChartIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* Should add a loading spinner */}
        {renderTab(activeTab) || (
          <Typography paragraph>Loading App....Please wait....</Typography>
        )}
      </main>
    </div>
  );
}

import { makeStyles, fade } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
  },
  appBar: {
    borderRadius: 15,
    marginBottom: 30,
    maxHeight: 64,
  },
  minHeight_64: {
    minHeight: 64,
    paddingLeft: 0,
    paddingRight: 10,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20,
    },
  },
  heading: {
    color: '#3f51b5',
    marginLeft: '20px',
  },
  image: {
    marginLeft: '15px',
  },
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse',
    },
  },
  welcome: {
    marginRight: 20,
  },
  postButton: {
    position: 'relative',
    bottom: -36,
    right: -20,
  },
  formTrigger: {
    backgroundColor: 'white',
    position: 'relative',
    top: '-25px',
    right: 'calc(-100% + 26px)',
    width: 56,
    height: 56,
    minHeight: 56,
    [theme.breakpoints.down('sm')]: {
      right: 'calc(-100% +26px)',
      width: 46,
      height: 46,
      minHeight: 46,
    },
  },
  root: {
    '& > *': {
      [theme.breakpoints.down('sm')]: {
        paddingTop: 8,
      },
    },
    display: 'flex',
    justifyContent: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  displayContents: {
    display: 'contents',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  infoAlert: {
    marginBottom: 10,
  },
  infoAlertRoot: {
    position: 'relative',
    alignItems: 'baseline',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginRight: 14,
    },
  },
  infoAlertAnchor: {
    top: 0,
  },
}));

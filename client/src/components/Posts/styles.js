import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    flexBasis: '33.33%',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  appBar: {
    marginBottom: 24,
    borderRadius: 15,
  },
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
    '& nav': {
      marginBottom: 5,
      marginTop: 5,
    },
  },
  searchGrow: {
    flexGrow: 1,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: 10,
  },
  ml_10: {
    marginLeft: 10,
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

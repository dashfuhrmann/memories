import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      bottom: theme.spacing(1),
      right: theme.spacing(1),
    },
  },
}));

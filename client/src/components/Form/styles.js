import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    width: '97%',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonClear: {
    width: '97%',
    marginBottom: 10,
  },
  alertContainer: {
    textAlign: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    position: 'relative',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    paddingTop: 10,
  },
  mt_10: {
    marginTop: 10,
  },
  progress: {
    left: 'calc(50% - 20px)',
    top: 'calc(50% - 20px)',
    position: 'absolute',
  },
  filter: {
    filter: 'brightness(0.5)',
  },
}));

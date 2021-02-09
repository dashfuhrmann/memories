import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  border: {
    border: 'solid',
  },
  selected: {
    filter: 'brightness(0.5)',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'white',
  },
  overlay3: {
    position: 'absolute',
    top: '60px',
    right: '10px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  likeButton: {
    justifyContent: 'flex-start',
    display: 'inline-flex',
    alignItems: 'center',
  },
  mr_5: {
    marginRight: '5px',
  },
  progress: {
    marginTop: '50%',
    marginLeft: '50%',
  },
  fullImage: {
    maxWidth: '-webkit-fill-available',
    maxHeight: '80%',
  },
  dialogContent: {
    overflow: 'hidden',
    margin: 8,
  },
  dialogContentRoot: {
    '&:first-child': {
      paddingTop: 8,
    },
  },
  lineBreak: {
    lineBreak: 'anywhere',
  },
  closeButtonDialog: {
    position: 'relative',
  },
});

import React from 'react';
import useStyles from './styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Fab,
  CircularProgress,
  Tooltip,
  Dialog,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import EditIcon from '@material-ui/icons/Edit';
import { setEdit } from '../../../actions/postState';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import { PUBLIC_URL } from '../../../constants/gcsConstants';

const Post = ({ post, setCurrentId, currentId }) => {
  const publicUrl = PUBLIC_URL;

  const classes = useStyles();

  const dispatch = useDispatch();

  const currentUserId = useSelector(
    (state) => state.auth.user && state.auth.user._id
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const setEditState = (event) => {
    dispatch(setEdit());
    setCurrentId(post._id);

    const anchor = (event.target.ownerDocument || document).querySelector(
      '#scroll-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        PaperProps={{
          style: {
            maxHeight: '80%',
            minWidth: '50%',
            display: 'contents',
          },
        }}
      >
        <img
          id="image"
          className={classes.fullImage}
          src={`${publicUrl}` + `xl-${post.selectedFile}`}
        ></img>
      </Dialog>
      <Card
        className={`${classes.card} ${
          currentId && post._id !== currentId ? classes.selected : null
        }`}
      >
        {post.isLoading ? (
          <CircularProgress className={classes.progress}></CircularProgress>
        ) : (
          <div>
            <CardMedia
              className={classes.media}
              image={`${publicUrl}` + `${post.selectedFile}`}
              title={post.title}
            ></CardMedia>

            <div className={classes.overlay}>
              <Typography variant="h6">{post.creator}</Typography>
              <Typography variant="body2">
                {moment(post.createdAt).fromNow()}
              </Typography>
            </div>
            {isAuthenticated && post.userId === currentUserId ? (
              <div className={classes.overlay2}>
                <Tooltip arrow title="Edit post">
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="edit"
                    onClick={(e) => setEditState(e)}
                  >
                    <EditIcon />
                  </Fab>
                </Tooltip>
              </div>
            ) : null}

            {window.innerWidth > 600 ? (
              <div
                className={
                  isAuthenticated && post.userId === currentUserId
                    ? classes.overlay3
                    : classes.overlay2
                }
              >
                <Tooltip arrow title="View full image">
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="expand"
                    onClick={handleClickOpen}
                  >
                    <AspectRatioIcon />
                  </Fab>
                </Tooltip>
              </div>
            ) : null}

            <div className={classes.details}>
              <Typography variant="body2" color="textSecondary">
                {post.tags.map((tag) => `#${tag} `)}
              </Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>
              {post.title}
            </Typography>
            <CardContent className={classes.lineBreak}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
              >
                {post.message}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              {post.likeUserIds.find((p) => p === currentUserId) ? (
                <div className={classes.likeButton}>
                  <Button
                    size="small"
                    className={classes.likeButton}
                    onClick={() =>
                      dispatch(likePost(post._id, currentUserId, 0))
                    }
                  >
                    <FavoriteIcon
                      fontSize="small"
                      className={classes.mr_5}
                    ></FavoriteIcon>
                    <span> {post.likeCount}</span>
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    size="small"
                    className={classes.likeButton}
                    onClick={() =>
                      dispatch(likePost(post._id, currentUserId, 1))
                    }
                  >
                    <FavoriteBorderIcon
                      fontSize="small"
                      className={classes.mr_5}
                    ></FavoriteBorderIcon>
                    <span> {post.likeCount}</span>
                  </Button>
                </div>
              )}

              {isAuthenticated && post.userId === currentUserId ? (
                <Button
                  size="small"
                  color="primary"
                  onClick={() => dispatch(deletePost(post._id))}
                >
                  <DeleteIcon fontSize="small"></DeleteIcon>
                  Delete
                </Button>
              ) : null}
            </CardActions>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Post;

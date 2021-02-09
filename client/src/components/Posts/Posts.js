import React, { useEffect, useState } from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { Grid, Snackbar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

const Posts = ({ setCurrentId, currentId }) => {
  const classes = useStyles();

  const posts = useSelector((state) => state.posts);
  const isCreate = useSelector((state) => state.postState.create);
  const isEdit = useSelector((state) => state.postState.edit);

  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFinishedLoading(true);
    }, 2000);
  }, []);

  return !posts.length && finishedLoading ? (
    <Snackbar
      open={!posts.length}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      className={classes.infoAlert}
      classes={{
        root: classes.infoAlertRoot,
        anchorOriginTopCenter: classes.infoAlertAnchor,
      }}
    >
      <Alert severity="error">No Posts found</Alert>
    </Snackbar>
  ) : (
    <div>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={isCreate || isEdit ? 6 : 4}>
            <Post
              post={post}
              setCurrentId={setCurrentId}
              currentId={currentId}
            ></Post>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Posts;

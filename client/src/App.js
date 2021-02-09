import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  AppBar,
  Grow,
  Grid,
  Fab,
  Toolbar,
  InputBase,
  Tooltip,
  Snackbar,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import { getUser } from './actions/auth';
import RegisterModal from './components/Auth/RegisterModal';
import LogoutLink from './components/Auth/LogoutLink';
import LoginModal from './components/Auth/LoginModal';
import { useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import Scroll from './components/Scroll/Scroll';
import SearchIcon from '@material-ui/icons/Search';
import { setCreate, reset } from './actions/postState';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCreate = useSelector((state) => state.postState.create);
  const isEdit = useSelector((state) => state.postState.edit);
  const pages = useSelector((state) => state.pagination.pages);
  const posts = useSelector((state) => state.posts);

  const [currentId, setCurrentId] = useState(null);

  const [page, setPage] = useState(1);

  const [searchterm, setSearchterm] = useState('');

  const prevPage = useRef();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    dispatch(getPosts(page));
  }, [currentId, dispatch]);

  useEffect(() => {
    // TODO: really dirty solution - need to get back to this
    if (posts.length === 5 || posts.length === 7) {
      dispatch(getPosts(page));
    }
  }, [posts]);

  useEffect(() => {
    if (prevPage.current !== page) {
      dispatch(getPosts(page));
    }
    prevPage.current = page;
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSetPostState = (e) => {
    e.preventDefault();

    if (!isCreate) {
      dispatch(setCreate());
    }
  };

  const handleUnsetPostState = (e) => {
    e.preventDefault();

    dispatch(reset());
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchterm) {
        dispatch(getPosts(page, searchterm));
      } else {
        dispatch(getPosts(page));
      }
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchterm(e.target.value);
  };

  return (
    <div>
      <Snackbar
        open={!isAuthenticated}
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
        <Alert severity="info">
          Create an account or login to post your memories!
        </Alert>
      </Snackbar>
      <Container maxwidth="lg" className={classes.container}>
        <div className={classes.grow}>
          <AppBar
            className={classes.appBar}
            position="static"
            id="scroll-to-top-anchor"
          >
            <Toolbar className={classes.minHeight_64}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  value={searchterm}
                  onChange={(event) => {
                    handleSearchTermChange(event);
                  }}
                  onKeyPress={(event) => {
                    handleSearch(event);
                  }}
                  placeholder="Search for title or tags"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <div className={classes.grow}></div>
              <div className={classes.displayContents}>
                {!isAuthenticated ? (
                  <>
                    <RegisterModal></RegisterModal>
                    <LoginModal></LoginModal>
                  </>
                ) : (
                  <>
                    <LogoutLink></LogoutLink>
                  </>
                )}
              </div>
            </Toolbar>
            {isAuthenticated ? (
              <>
                {isCreate || isEdit ? (
                  <Tooltip className={classes.formTrigger} title="Close" arrow>
                    <Fab
                      aria-label="close"
                      onClick={(e) => handleUnsetPostState(e)}
                    >
                      <CloseIcon />
                    </Fab>
                  </Tooltip>
                ) : (
                  <Tooltip
                    className={classes.formTrigger}
                    title="Create Post"
                    arrow
                  >
                    <Fab
                      aria-label="create"
                      onClick={(e) => handleSetPostState(e)}
                    >
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                )}
              </>
            ) : null}
          </AppBar>
        </div>

        <Grow in>
          <Container>
            <Grid
              container
              className={classes.mainContainer}
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={isCreate || isEdit ? 8 : 12}>
                <Posts
                  setCurrentId={setCurrentId}
                  currentId={currentId}
                ></Posts>
              </Grid>
              {isAuthenticated && (isCreate || isEdit) ? (
                <>
                  <Grid item xs={12} sm={4}>
                    <Form
                      currentId={currentId}
                      setCurrentId={setCurrentId}
                    ></Form>
                  </Grid>
                </>
              ) : null}
            </Grid>
          </Container>
        </Grow>

        <Scroll>
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </Scroll>
      </Container>

      {pages > 1 ? (
        <div className={classes.root}>
          <Pagination
            onChange={handleChange}
            count={pages}
            color="primary"
            size="large"
            page={page}
          />
        </div>
      ) : null}
    </div>
  );
};

export default App;

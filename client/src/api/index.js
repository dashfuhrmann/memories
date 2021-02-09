import axios from 'axios';

const posts = 'https://memories-v1.herokuapp.com/posts';
const auth = 'https://memories-v1.herokuapp.com/auth';
const users = 'https://memories-v1.herokuapp.com/users';
// const posts = 'http://localhost:5000/posts';
// const auth = 'http://localhost:5000/auth';
// const users = 'http://localhost:5000/users';

export const fetchPosts = (page, searchterm = 'undefined') =>
  axios.get(`${posts}/${page}/${searchterm}`);

export const createPost = (newPost, header) =>
  axios.post(posts, newPost, header);

export const updatePost = (id, updatedPost, header) =>
  axios.patch(`${posts}/${id}`, updatedPost, header);

export const deletePost = (id, header) =>
  axios.delete(`${posts}/${id}`, header);

export const likePost = (id, userId, option, header) =>
  axios.patch(`${posts}/${id}/${userId}/${option}/likePost`, {}, header);
export const getUser = (header) => axios.get(`${auth}/user`, header);

export const registerUser = (header, body) =>
  axios.post(`${users}`, body, header);

export const loginUser = (header, body) => axios.post(`${auth}`, body, header);

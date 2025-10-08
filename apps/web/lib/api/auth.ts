import { SignInDtoType } from '@echopost/shared-types';
import axios from './axios';

const postLogin = async (credentials: SignInDtoType) => {
  const response = await axios.post('/auth/login', credentials);
  return response;
};

const postLogout = async () => {
  const response = await axios.post('/auth/logout');
  return response;
};

const getUserMe = async () => {
  const response = await axios.get('/users/me');
  return response;
};

export { postLogin, postLogout, getUserMe };

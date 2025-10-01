import { AxiosResponse } from 'axios';
import axios from './axios';
import { SignInDtoType } from '@echopost/shared-types';

const BASE_URL = '/auth';

const postLogin = async (credentail: SignInDtoType): Promise<AxiosResponse> => {
  const res = await axios.post(BASE_URL + '/login', credentail);
  return res;
};

export { postLogin };

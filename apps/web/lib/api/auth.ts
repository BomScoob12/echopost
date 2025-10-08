import useAxios from './axios';
import HTTP_METHOD from './http-method';

const useAuthManagement = () => {
  const [{ loading: loginLoading, error: loginError }, postLogin] = useAxios({
    method: HTTP_METHOD.POST,
    url: '/auth/login',
  });

  return {
    postLogin: {
      loading: loginLoading,
      error: loginError,
      postLogin,
    },
  };
};

export default useAuthManagement;

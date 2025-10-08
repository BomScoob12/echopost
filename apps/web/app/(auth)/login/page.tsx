'use client';

import React from 'react';
import { SignInDtoType } from '@echopost/shared-types';
import useAuthManagement from '@/lib/api/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

function Login() {
  const {
    postLogin: { loading, error, postLogin },
  } = useAuthManagement();

  const [showError, setShowError] = React.useState(false);
  const { register, handleSubmit } = useForm<SignInDtoType>();

  const onSubmit: SubmitHandler<SignInDtoType> = async (data) => {
    await postLogin({ data });
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/auth/google';
  };

  React.useEffect(() => {
    if (error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [error]);

  return (
    <Container
      component={'main'}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Stack component={'section'} width={{ sm: 2 / 3, md: 1 / 3 }}>
        <Typography
          variant="h2"
          component={'h2'}
          sx={{ m: '2rem 0 2rem 1rem' }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack component={'div'} gap={2}>
            <TextField
              label="Email"
              {...register('email', { required: true, min: 6 })}
            />
            <TextField
              label="Password"
              {...register('password', { required: true, min: 8 })}
            />
            <Button type="submit" variant="outlined">
              {loading ? '...' : 'Login'}
            </Button>
            {showError ?? (
              <Alert
                severity="error"
                onClose={() => {
                  setShowError(false);
                }}
              >
                Login error. please tye again.
              </Alert>
            )}
          </Stack>
        </form>

        <Typography component={'p'}>
          You not have an account? <>register</>
        </Typography>
        <Button onClick={handleGoogleLogin} variant="outlined">
          Google login
        </Button>
      </Stack>
    </Container>
  );
}

export default Login;

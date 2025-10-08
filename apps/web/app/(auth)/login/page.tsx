'use client';

import React from 'react';
import { SignInDtoType } from '@echopost/shared-types';
import { postLogin } from '@/lib/api/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';

function Login() {
  const { register, handleSubmit } = useForm<SignInDtoType>();

  const onSubmit: SubmitHandler<SignInDtoType> = (data) => {
    const response = postLogin(data);
    console.log(response);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/auth/google';
  };

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
              Login
            </Button>
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

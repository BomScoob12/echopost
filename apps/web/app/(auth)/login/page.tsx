'use client';

import React from 'react';
import style from './login.module.css';
import { SignInDtoType } from '@echopost/shared-types';
import { postLogin } from '@/lib/api/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@mui/material';

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
    <div className={style.main}>
      <section className={style.container}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('email', { required: true, min: 6 })} />
          <Input {...register('password', { required: true, min: 8 })} />
          <Button type="submit">Login</Button>
        </form>
        <span>
          You not have an account? <a>register</a>
        </span>
        <button onClick={handleGoogleLogin}>Google login</button>
      </section>
    </div>
  );
}

export default Login;

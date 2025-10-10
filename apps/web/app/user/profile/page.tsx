'use client';

import { useAuthStore } from '@/app/store';
import { Box, Container } from '@mui/material';
import Image from 'next/image';
import React from 'react';

function UserProfile() {
  const { user } = useAuthStore();

  return (
    <Container>
      <Box>{JSON.stringify(user)}</Box>
      {/* <Image src={user?.imageLink} alt="User Avatar" width={100} height={100} /> */}
    </Container>
  );
}

export default UserProfile;

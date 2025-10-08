'use client';

import React from 'react';
import { useAuthStore } from '../store';
import { redirect, RedirectType } from 'next/navigation';

function UserLayout({ children }: { children: React.ReactNode }) {
  const { loading, isAuthenticated } = useAuthStore();

  if (!loading && !isAuthenticated) {
    redirect('/login', RedirectType.push);
  }

  return <>{children}</>;
}

export default UserLayout;

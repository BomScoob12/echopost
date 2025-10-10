'use client';

import React from 'react';
import { useAuthStore } from '../store';
import { redirect, RedirectType } from 'next/navigation';

function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user, isAuthenticated, loading, error, fetchUser } = useAuthStore();

  React.useEffect(() => {
    if (!user && !error) {
      fetchUser();
    }
  }, [user, error, fetchUser]);

  if (loading || user === undefined) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    redirect('/login', RedirectType.push);
  }

  return <>{children}</>;
}

export default AuthLayout;

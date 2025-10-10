import AuthLayout from '@/app/components/AuthLayout';
import React from 'react';

function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthLayout>{children}</AuthLayout>;
}

export default ProfileLayout;

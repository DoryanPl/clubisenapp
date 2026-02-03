'use client';

import { useAuth } from '@/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner } from '@heroui/react';

const publicRoutes = ['/', '/clubs', '/login'];

export function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = publicRoutes.some(route => {
      if (route === '/') return pathname === '/';
      return pathname.startsWith(route);
    });

    if (!isLoggedIn && !isPublicRoute) {
      router.push('/');
    }
  }, [isLoggedIn, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="secondary" />
      </div>
    );
  }

  return <>{children}</>;
}

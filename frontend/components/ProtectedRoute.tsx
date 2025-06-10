'use client';

import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redireciona para a página de login se não estiver autenticado
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Não renderiza nada enquanto verifica a autenticação
  }

  return <>{children}</>;
} 
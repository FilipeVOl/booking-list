'use client';

import { useState } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });

      const data = await response.data;

      if (response.status !== 200) {
        throw new Error(data.message || 'Erro ao fazer login'); 
      }

      localStorage.setItem('token', data.token);
      login(data.user);
      setSuccess('Login realizado com sucesso');

      router.push('/');
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message || 'Ocorreu um erro ao fazer login');
      } else {
        setError('Ocorreu um erro inesperado');
      }
    }
  };

  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{success}</span>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="rounded-md  -space-y-px flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="text-black ml-2 font-bold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full px-3 py-2 focus:ring-secondary focus:border-secondary border-transparent border focus:border-2 outline-none rounded-md shadow-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-black ml-2 font-bold">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 focus:ring-secondary focus:border-secondary border-transparent border focus:border-2 outline-none rounded-md shadow-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="text-center text-sm text-gray-500">Não tem uma conta? <span onClick={() => 
              router.push('/register')} 
              className="text-secondary hover:text-secondary/80 cursor-pointer">Cadastre-se</span></p>
          </div>

          <div>
            <Button
              variant="default"
              className="px-4 py-2"
              type="submit"
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 
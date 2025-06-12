'use client';

import { useState } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    const { name } = e.target;
    if (name === 'cpf') {
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await axios.post('https://booking-list-production.up.railway.app/api/users/', {
        name: formData.name,
        cpf: formData.cpf.replace(/\D/g, ''),
        email: formData.email,
        password: formData.password
      });

      if (response.status !== 201) {
        throw new Error(response.data.error || 'Erro ao criar conta');
      }

      localStorage.setItem('token', response.data.token);
      login(response.data.user);
      setSuccess('Conta criada com sucesso');
      router.push('/login');
    } catch (err) {
      if (err instanceof AxiosError) {
        const backendError = err.response?.data;
        setError(
          backendError?.error || backendError?.message || 'Ocorreu um erro ao criar sua conta'
        );
      } else {
        setError('Ocorreu um erro inesperado');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md  w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Criar conta
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
          <div className="rounded-md -space-y-px flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-black ml-2 font-bold">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full px-3 py-2 focus:ring-secondary focus:border-secondary border-transparent border focus:border-2 outline-none rounded-md shadow-sm"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="cpf" className="text-black ml-2 font-bold">
                CPF
              </label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                required
                maxLength={14}
                className="appearance-none relative block w-full px-3 py-2 focus:ring-secondary focus:border-secondary border-transparent border focus:border-2 outline-none rounded-md shadow-sm"
                placeholder="Seu CPF"
                value={formData.cpf}
                onChange={handleChange}
              />
            </div>
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
                placeholder="Seu email"
                value={formData.email}
                onChange={handleChange}
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
                placeholder="Sua senha"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-black ml-2 font-bold">
                Confirmar Senha
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="relative block w-full px-3 py-2 focus:ring-secondary focus:border-secondary border-transparent border focus:border-2 outline-none rounded-md shadow-sm"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <p className="text-center text-sm text-gray-500">
              Já tem uma conta?{' '}
              <span
                onClick={() => router.push('/login')}
                className="text-secondary hover:text-secondary/80 cursor-pointer"
              >
                Faça login
              </span>
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              variant="default"
              type="submit"
              className="px-4 py-2"
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

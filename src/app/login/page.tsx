'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/loginForm';
import { UserRequestType, UserResponseType } from '@/types/User';
import AlertCard from '@/components/alertCard';
import { login } from '@/services/userService';
import { useAppDispatch } from '@/store/index';
import { setAuthUser } from '@/store/authUser/authUserSlice';
import Link from 'next/link';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleLoginSubmit = async (data: UserRequestType) => {
    try {
      // Replace with your API call
      const response: UserResponseType = await login(data);
      dispatch( setAuthUser(response) );
      router.push('/menu');
    } catch {
      setAlert({ message: 'Usuario o contraseña inválidos.', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-8">Iniciar Sesión</h1>
      {alert && <AlertCard message={alert.message} type={alert.type}/>}
      <LoginForm onSubmit={handleLoginSubmit} />
      {/* Enlace añadido */}
    <div className="text-center mt-4">
      <Link
        href="/reset-password"
        className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
      >
        ¿Olvidaste tu contraseña?
      </Link>
    </div>
    </div>
  );
};

export default Login;
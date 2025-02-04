'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AlertCard from '@/components/alertCard';
import { updatePassword } from '@/services/forgotPasswordService'; // Servicio ajustado

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ nombreUsuario: '', nuevaContrasena: '' });
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Llama al servicio para actualizar la contraseña
      await updatePassword({ contrasena: formData.nuevaContrasena }, formData.nombreUsuario);
      setAlert({ message: 'Contraseña actualizada con éxito.', type: 'success' });

      // Redirigir al /menu después de un retraso
      setTimeout(() => {
        router.push('/login');
      }, 4000);
    } catch (error) {
      console.log(error)
      setAlert({ message: 'Error al actualizar la contraseña. Intente de nuevo.', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-8">Recuperar Contraseña</h1>
      {alert && <AlertCard message={alert.message} type={alert.type} />}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreUsuario">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombreUsuario"
            value={formData.nombreUsuario}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nuevaContrasena">
            Nueva Contraseña
          </label>
          <input
            type="password"
            id="nuevaContrasena"
            name="nuevaContrasena"
            value={formData.nuevaContrasena}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            minLength={8} // Validación de longitud mínima
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Contraseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

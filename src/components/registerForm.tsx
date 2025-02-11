"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AlertCard from "@/components/alertCard";
import { registerUser } from "@/services/registerService";
import { CreateUserType } from "@/types/CreateUserType";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateUserType>({
    usuario: "",
    contrasena: "",
    nombreCompleto: "",
    rol: "client", // Valor por defecto
  });
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setAlert({ message: "Usuario registrado con éxito.", type: "success" });

      // Redirigir al login después de un retraso
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
      setAlert({ message: "Error al registrar el usuario. Intente de nuevo.", type: "error" });
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Registro</h1>
      {alert && <AlertCard message={alert.message} type={alert.type} />}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usuario">
            Usuario
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contrasena">
            Contraseña
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            minLength={6}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreCompleto">
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombreCompleto"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rol">
            Rol
          </label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="client">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

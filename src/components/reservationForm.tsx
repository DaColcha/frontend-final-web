'use client';

import { useState } from 'react';
import { ReserveRequestType } from '@/types/Reserve';
import { useAppSelector } from '@/store';
import {UserResponseType} from "@/types/User";

interface ReservationFormProps {
  onSubmit: (data: ReserveRequestType, user : UserResponseType) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onSubmit }) => {
  const authUser = useAppSelector((state) => state.authUser.authUser);
  
  const [formData, setFormData] = useState<ReserveRequestType>({
    fecha: '',
    hora: '',
    cantidadPersonas: 1,
    observaciones: '',
    usuarioId: process.env.NEXT_PUBLIC_USER_ID + ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      fecha: '',
      hora: '',
      cantidadPersonas: 1,
      observaciones: '',
      usuarioId: ''
    });
    onSubmit(formData, authUser);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">Fecha</label>
        <input
          type="text"
          id="fecha"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          placeholder="dd-mm-yyyy"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora">Hora</label>
        <input
          type="text"
          id="hora"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          placeholder="HH:MM"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidadPersonas">Cantidad de Personas</label>
        <input
          type="number"
          id="cantidadPersonas"
          name="cantidadPersonas"
          value={formData.cantidadPersonas}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="observaciones">Observaciones</label>
        <textarea
          id="observaciones"
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reservar
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
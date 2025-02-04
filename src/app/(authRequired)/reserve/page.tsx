'use client';

import { useState } from 'react';
import ReservationForm from '@/components/reservationForm';
import AlertCard from '@/components/alertCard';
import { ReserveRequestType, ReserveResponseType } from '@/types/Reserve';
import { reserveTable } from '@/services/reserveService';
import {UserResponseType} from "@/types/User";

const Reserve: React.FC = () => {

  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  

  const handleReservationSubmit = async (data: ReserveRequestType, user: UserResponseType ) => {
    try {
      console.log(data)
      const response: ReserveResponseType = await reserveTable(
          {
            ...data, 
            usuarioId : user.id
          },
          user.token
      );
      setAlert({ message: `Reserva exitosa! Mesa asignada: ${response.mesa.id}`, type: 'success' });
    } catch (error) {
      console.error('Error:', error);
      setAlert({ message: 'Lo sentimos, la reserva no pudo ser realizada.', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-8">Reservar</h1>
      {alert && <AlertCard message={alert.message} type={alert.type} />}
      <ReservationForm onSubmit={handleReservationSubmit} />
    </div>
  );
};

export default Reserve;
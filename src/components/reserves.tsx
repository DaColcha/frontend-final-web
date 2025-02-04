'use client';
import {useEffect, useState} from "react";
import {UserReservesType} from "@/types/Reserve";
import {useAppSelector} from "@/store";
import {userReserves} from "@/services/userReservesService";
import ReserveItem from "@/components/reserveItem";
import {deleteReserve} from "@/services/reserveService";
import AlertCard from "@/components/alertCard";

export default function Reserves() {
    const [reserves, setReserves] = useState([] as UserReservesType[]);
    const authUser = useAppSelector((state) => state.authUser.authUser);
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);


    useEffect(() => {
        const fetchReserves = async () => {
            try {
                const fetchedReserves = await userReserves(authUser.id,authUser.token);
                setReserves(fetchedReserves);
            } catch (error) {
                console.log("Fetch error:", error);
            }
        }
        fetchReserves();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteReserve(
                authUser.token,
                id
            )
            setAlert({message: `Reserva eliminada correctamente`, type: 'success'});
            setReserves((prevReserves) => prevReserves.filter((reserve) => reserve.id !== id))
        } catch (error) {
            console.error("Error:", error);
            setAlert({message: `Error al eliminar reserva.`, type: 'error'});
        }

    }

    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {alert && <AlertCard message={alert.message} type={alert.type}/>}
            {reserves.length > 0 ? reserves.map((reserve) => (
                <ReserveItem reservaEntered={reserve}
                             key={reserve.id}
                             onDelete={() => handleDelete(reserve.id)}
                />
            )) : <p className="text-2xl mt-52"> No tienes reservas</p>}

        </div>
    );
}
import {Estado, UserReservesType} from "@/types/Reserve";
import {useEffect, useState} from "react";
import {updateReserve} from "@/services/reserveService";
import {useAppSelector} from "@/store";
import AlertCard from "@/components/alertCard";
import {Trash2} from "lucide-react";
import {ActualizarReservaDialog} from "@/components/updateDialog";

interface ReserveItemProps {
    reservaEntered: UserReservesType;
    onDelete: (id: string) => Promise<void>;
}

const ReserveItem: React.FC<ReserveItemProps> = ({reservaEntered, onDelete} : ReserveItemProps) => {
    const authUser = useAppSelector((state) => state.authUser.authUser);
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const [canFinalize, setCanFinalize] = useState(false);
    const [canUpdate, setCanUpdate] = useState(false);
    const [inProgress, setInProgress] = useState(false);

    const [reserva, setReserva] = useState<UserReservesType>(reservaEntered);

    const canDelete = reserva.estado === "finalizada" || reserva.estado === "cancelada";

    const updateStates = () => {
        const updateState = reserva.estado === "solicitada"
        const finishedState = reserva.estado === "finalizada"

        // Obtener la hora actual
        const now = new Date();

        // Obtener la fecha y hora de la reserva
        const [hour, minute] = reserva.hora.split(":").map(Number);
        const [year, month, day] = reserva.fecha.split("-").map(Number);
        const reservaDate = new Date(year, month - 1, day, hour, minute, 0, 0); // Nota: meses en JS van de 0 a 11

        //Comprobar si la reserva está en progreso
        setInProgress((now > reservaDate) && !finishedState);

        // Comprobar si la reserva se puede actualizar
        setCanUpdate(!inProgress && updateState);

        // Sumar 30 minutos a la hora de la reserva
        const reservaDeadline = new Date(reservaDate.getTime() + 45 * 60000);

        setCanFinalize((now >= reservaDeadline) && !finishedState);
    }

    const handleChangeState = async (newState: string) => {

        try {
            await updateReserve(
                {estado: newState},
                authUser.token,
                reserva.id
            );
            setAlert({message: `Reserva actualizada con éxito!`, type: 'success'});

        } catch (error) {
            console.error("Error:", error);
            setAlert({message: `Error al actualizar reserva.`, type: 'error'});
        }

        setReserva({...reserva, estado: newState});

        updateStates()
    }

    const handleUpdate = async (reservaToUpdate : Partial<UserReservesType>) => {

        try {
            console.log(reservaToUpdate)
            const updatedReserve = await updateReserve(
                reservaToUpdate,
                authUser.token,
                reserva.id
            );
            setReserva({...updatedReserve});
            setAlert({message: `Reserva actualizada con éxito!`, type: 'success'});

        } catch (error) {
            console.error("Error:", error);
            setAlert({message: `Error al actualizar reserva.`, type: 'error'});
        }

        updateStates()
    }


    useEffect(() => {
        updateStates();
    }, [reserva.estado, reserva.hora, reserva.fecha]);


    return (<div className="w-[375px] rounded overflow-hidden shadow-lg m-4">
            {alert && <AlertCard message={alert.message} type={alert.type}/>}
            {canUpdate && (
                <ActualizarReservaDialog reservaEntered={reserva} onUpdateAction={handleUpdate}/>
            )}
            <div className="px-6 py-4">
                <div className="font-bold flex justify-between">
                    <p className=" text-xl mb-2">{reserva.fecha}</p>
                    <p
                        className={`${Estado[reserva.estado as keyof typeof Estado]} flex items-center text-sm text-white px-2 py-1 rounded-full w-fit `}
                    >
                        {reserva.estado}
                    </p>
                </div>
                <p className="text-gray-700 text-base">
                    <span className="font-bold">Hora:</span> {reserva.hora.substring(0, 5)}
                </p>
                <p className="text-gray-700 text-base">
                    <span className="font-bold">Personas:</span> {reserva.cantidadPersonas}
                </p>
                <p className="text-gray-700 text-base">
                <span
                    className="font-bold">Observaciones:</span> {reserva.observaciones !== "" ? reserva.observaciones : 'No hay observaciones'}
                </p>
                <p className="text-gray-700 text-base">
                    <span className="font-bold">Mesa:</span> {reserva.mesa.id}
                </p>
            </div>
            {canUpdate &&
                (<div className="flex justify-center gap-3 ">
                        <button
                            type="button"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleChangeState("confirmada")}
                        >
                            Confirmar
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleChangeState("cancelada")}
                        >
                            Cancelar
                        </button>
                    </div>
                )
            }

            {inProgress && !canFinalize && (
                <div className="flex justify-center gap-3 ">
                    <p>Reserva en progreso ...</p>
                </div>
            )}

            <div className="flex justify-center mb-2">
                {canFinalize && (
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full ml-2 mr-2 mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25"
                        onClick={() => handleChangeState("finalizada")}
                    >
                        Finalizar
                    </button>
                )
                }
            </div>

            <div className="flex justify-center mb-2">
                { canDelete &&
                    (<div className="flex justify-center mb-2">
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold w-full ml-2 mr-2 mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center gap-2"
                            onClick={(e) => {
                                e.preventDefault(); // Evita un comportamiento inesperado
                                onDelete(reserva.id); // Llama a la función de eliminación
                            }}
                            >
                            <Trash2/>
                        </button>
                    </div>
                    )
                }
            </div>
        </div>
    )
};

export default ReserveItem;
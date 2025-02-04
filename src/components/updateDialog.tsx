'use client';
import {UserReservesType} from "@/types/Reserve";
import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon, Pencil} from "lucide-react";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ReservaData {
    fecha: Date | undefined
    hora: string
    observaciones: string
}

interface ActualizarReservaDialogProps {
    reservaEntered: UserReservesType;
    onUpdateAction: (reserve: Partial<UserReservesType>) => Promise<void>;
}

export function ActualizarReservaDialog({reservaEntered, onUpdateAction}: ActualizarReservaDialogProps) {
    const [year, month, day] = reservaEntered.fecha.split("-").map(Number);
    const reservaDate = new Date(year, month - 1, day, 0, 0, 0, 0);


    const [isOpen, setIsOpen] = useState(false)
    const [reserva, setReserva] = useState<ReservaData>({
        fecha: reservaDate,
        hora: reservaEntered.hora,
        observaciones: reservaEntered.observaciones
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setReserva(prev => ({ ...prev, [name]: value }))
    }

    const handleDateSelect = (date: Date | undefined) => {
        setReserva(prev => ({ ...prev, fecha: date }))
    }

    function formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0'); // Asegura dos dígitos
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (0-11)
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const updateData : Partial<UserReservesType> = {
                ...(reserva.fecha && { fecha: formatDate(reserva.fecha) }),
                hora: reserva.hora.substring(0,5),
                observaciones: reserva.observaciones,
            }

            await onUpdateAction(updateData)
            setIsOpen(false);
        } catch (error) {
            console.error("Error:", error);
            throw new Error("Error al actualizar reserva");
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost"><Pencil size={28}/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Actualizar Reserva</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fecha">Fecha</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !reserva.fecha && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                    {reserva.fecha ? format(reserva.fecha, "PPP", {locale: es}) :
                                        <span>Selecciona una fecha</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={reserva.fecha}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hora">Hora</Label>
                        <Input
                            id="hora"
                            name="hora"
                            type="time"
                            value={reserva.hora}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="observaciones">Observaciones</Label>
                        <Textarea
                            id="observaciones"
                            name="observaciones"
                            value={reserva.observaciones}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Button type="submit" className="w-full"
                    >Guardar Cambios</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

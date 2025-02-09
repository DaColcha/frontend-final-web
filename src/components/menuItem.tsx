import { MenuItemType } from '../types/MenuItem';
import Image from 'next/image';

const MenuItem: React.FC<MenuItemType> = ({ NOMBRE, DESCRIPCION, PRECIO, IMAGEN }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
    <Image className="w-full h-64 object-cover" src={IMAGEN} alt={NOMBRE} width={300} height={300}/>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{NOMBRE}</div>
      <p className="text-gray-700 text-base">{DESCRIPCION}</p>
      <p className="text-gray-900 text-lg font-semibold">{PRECIO.toFixed(2)} $</p>
    </div>
  </div>
);

export default MenuItem;
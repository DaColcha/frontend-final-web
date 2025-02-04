import Link from "next/link";
import SignOutButton from "./signOutButton";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Restaurant Name
        </Link>
        <div className="space-x-4">
          <Link href="/menu" className="text-gray-300 hover:text-white">
            Menú
          </Link>
          <Link href="/reserve" className="text-gray-300 hover:text-white">
            Reservar
          </Link>
          <Link href="/my-reserves" className="text-gray-300 hover:text-white">
            Mis reservas
          </Link>
          <Link href="/chat" className="text-gray-300 hover:text-white">
            Chat
          </Link>
        </div>
        <SignOutButton />
      </div>
    </nav>
  );
};

export default Navbar;

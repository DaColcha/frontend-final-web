'use client'

import { useAppDispatch } from "@/store";
import { signOut } from "@/store/authUser/authUserSlice";
import { useRouter } from "next/navigation";

const SignOutButton: React.FC = () =>{
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signOutHandler = () => {
    dispatch(signOut());
    router.push("/login");
  }

  return (
    <button
      type="button"
      onClick={signOutHandler}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Cerrar sesión
    </button>
  );
}

export default SignOutButton;

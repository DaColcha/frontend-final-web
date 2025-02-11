import { CreateUserType } from "@/types/CreateUserType";

export const registerUser = async (formData: CreateUserType): Promise<CreateUserType> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/auth/register`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }
      return await response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};

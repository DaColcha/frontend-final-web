import { ResetPasswordType } from "@/types/ResetPassword";

export const updatePassword = async (formData: ResetPasswordType, nombreUsuario: string): Promise<ResetPasswordType>  => {
    const url = `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/auth/change-password/${nombreUsuario}`;
  
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(async response => {
        console.log(response)
            if (!response.ok) {
                throw new Error('Failed to reset password');
            }
            return await response.json();
      })
      .then(data => {
        console.log(data)
        return data;
    })
    .catch(error => {
        console.error("Fetch error:", error);
        throw error;
    });
  };
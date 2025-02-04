import { UserRequestType, UserResponseType } from '@/types/User';

export const login = async (loginData: UserRequestType): Promise<UserResponseType> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/auth/login`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      return await response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error("Fetch error:", error);
      throw error;
    });
}
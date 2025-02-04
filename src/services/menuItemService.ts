import { MenuItemType } from "@/types/MenuItem";

export const getAllMenuItems = async (userToken: string): Promise<MenuItemType[]> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/menu`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
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
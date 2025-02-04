import {UserReservesType} from "@/types/Reserve";

export const userReserves = async (userId: string, userToken: string): Promise<UserReservesType[]> => {
    const url = `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/reservas/user/${userId}`;
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    })
        .then(async response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to get user reserves');
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
}
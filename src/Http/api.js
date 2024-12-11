import { apiRequest } from "./apiService"

export const UserList = async () => {
    try {
        //console.log('insidekey', secretKey)
        const response = await apiRequest("GET", `/api/inqueryList`);
        //console.log('resp', response)
        return response;
    } catch (error) {
        return false;
    }
}

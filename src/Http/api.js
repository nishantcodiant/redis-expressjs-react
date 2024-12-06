import { apiRequest } from "./apiService"

export const UserList = async () => {
    try {
        //console.log('insidekey', secretKey)
        const response = await apiRequest("GET", `/api/user-list`);
        //console.log('resp', response)
        return response;
    } catch (error) {
        return false;
    }
}

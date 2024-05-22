import axios from 'axios';

const API_URL = 'http://localhost:8082/api/general';

export const getAllUsers = async (): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/allUsers`);
        console.log('Get all users successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Get all users Error:', error);
    }
}

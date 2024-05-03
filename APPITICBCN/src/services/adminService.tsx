import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8082/api/admin';

export const getAllUsers = async (): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/allUsers`);
        console.log('Get all users successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Get all users Error:', error);
    }
}

export const addMatricula = async (email: string, matricula: any): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/addMatricula/${email}`, matricula);
        console.log('Add matricula successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Add matricula Error:', error);
    }
}

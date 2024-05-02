import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8082/api';

export const loginUser = async (email: string, password: string): Promise<void> => {
    try {
        // Hacer el POST para iniciar sesión
        const response = await axios.post(`${API_URL}/auth/signin`, {
            email,
            password,
        });

        console.log('Login successful:', response.data);

        // Supongamos que el servidor envía el JWT en el cuerpo de la respuesta
        const jwtToken = response.data.jwtToken;
        console.log('JWT Token:', jwtToken);

        axios.defaults.headers.common = {'Authorization': `Bearer ${jwtToken}`}

        // Guardar el JWT en AsyncStorage
        await AsyncStorage.setItem('jwtToken', jwtToken);
        console.log('JWT Token saved to AsyncStorage');

    } catch (error) {
        console.error('Login Error:', error);
    }
}

export const fetchUserRole = async (email) => {
    try {
        const jwtToken = await AsyncStorage.getItem('jwtToken'); // Obtener el JWT almacenado

        if (!jwtToken) {
            throw new Error('JWT Token is not available');
        }

        axios.defaults.headers.common = {'Authorization': `Bearer ${jwtToken}`}
        const response = await axios.get(`${API_URL}/general/role/${email}`);
        console.log('Role fetched:', response.data);
        return response.data; // Asumiendo que el rol viene directamente en response.data
    } catch (error) {
        console.error('Error fetching user role:', error);
        return null; // Maneja el error como consideres necesario
    }
}

export const getJwtToken = async (): Promise<string | null> => {
    try {
        const jwtToken = await AsyncStorage.getItem('jwtToken');
        return jwtToken;
    } catch (error) {
        console.error('Error fetching JWT from AsyncStorage:', error);
        return null;
    }
}

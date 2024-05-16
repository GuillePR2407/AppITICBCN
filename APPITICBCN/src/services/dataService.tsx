// dataService.tsx
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getProtectedData = async (): Promise<any> => {
    try {
        const token = await AsyncStorage.getItem('userToken'); // Recuperar el token
        if (!token) throw new Error('No token found');
        const response = await axios.get('http://10.0.2.2:8082/api/protected-route', {
        headers: {
            'Authorization': `Bearer ${token}` // Usar el token en la cabecera de autorización
        }
        });
        return response.data;
    } catch (error: any) {
        console.error('Error al acceder a datos protegidos:', error);
        throw error;
    }
};

export default getProtectedData;

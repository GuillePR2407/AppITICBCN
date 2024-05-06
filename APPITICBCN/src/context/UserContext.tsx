import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'; 

function decodeToken(token) {
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error("Error decoding token: ", error);
        return null;
    }
}

interface DecodedToken {
    role: UserRole; // Asegúrate de que el nombre de la propiedad coincida con lo que tu token realmente tiene.
}

type UserRole = 0 | 1 | 2 | 3 | 4; // 0: Logout, 1: User 2: Alumno, 3: Profesor, 4: Admin

interface UserContextType {
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userRole, setUserRole] = useState<UserRole>(0);

    const loadUserRoleFromStorage = async () => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            const decodedToken: DecodedToken = jwtDecode(token); // Especifica el tipo explícitamente
            setUserRole(decodedToken.role); // Usa la propiedad correcta según tu token
        }
    };

    useEffect(() => {
        loadUserRoleFromStorage();
    }, []);

    return (
        <UserContext.Provider value={{ userRole, setUserRole }}>
            {children}
        </UserContext.Provider>
    );
};

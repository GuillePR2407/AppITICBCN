import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode }  from 'jwt-decode';

type UserRole = 0 | 1 | 2 | 3 | 4; // 0: Logout, 1: User, 2: Alumno, 3: Profesor, 4: Admin

interface UserContextType {
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
    saveUserToken: (token: string) => void;
    clearUserToken: () => void;
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
            try {
                const decodedToken: { role: UserRole } = jwtDecode(token);
                setUserRole(decodedToken.role);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    };

    const saveUserToken = async (token: string) => {
        try {
            await AsyncStorage.setItem('userToken', token);
            const decodedToken: { role: UserRole } = jwtDecode(token);
            setUserRole(decodedToken.role);
        } catch (error) {
            console.error('Failed to save user token to storage', error);
        }
    };

    const clearUserToken = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            setUserRole(0); // Set user role to 0 (logout)
        } catch (error) {
            console.error('Failed to clear user token from storage', error);
        }
    };

    useEffect(() => {
        loadUserRoleFromStorage();
    }, []);

    return (
        <UserContext.Provider value={{ userRole, setUserRole, saveUserToken, clearUserToken }}>
            {children}
        </UserContext.Provider>
    );
};

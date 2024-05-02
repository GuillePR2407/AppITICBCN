import React, { createContext, useContext, useState, ReactNode } from 'react';

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

    return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
        {children}
    </UserContext.Provider>
    );
};

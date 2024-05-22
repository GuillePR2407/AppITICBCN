import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';
import { getAllUsers } from '../services/generalService';
import { PreferencesContext } from '../index';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';

interface User {
    email: string;
    username: string;
    role: {
        name: string;
    };
}

const AlumSection: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const { theme } = React.useContext(PreferencesContext);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handlePress = (email: string) => {
        const newSet = new Set(expandedIds);
        if (newSet.has(email)) {
            newSet.delete(email);
        } else {
            newSet.add(email);
        }
        setExpandedIds(newSet);
    };

    useEffect(() => {
        getAllUsers()
            .then((allUsers) => {
                const alumnos = allUsers.filter((user: User) => user.role.name === 'ROLE_STUDENT');
                setUsers(alumnos);
            })
            .catch(console.error);
    }, []);

    return (
        <ScrollView style={{ padding: 20 }}>
            {users.map((user) => (
                <View
                    key={user.email}
                    style={{
                        backgroundColor: theme.colors.listItem,
                        margin: 15,
                        marginTop: 15,
                        marginBottom: 0,
                        borderRadius: 10,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                        elevation: 4,
                    }}
                >
                    <List.Accordion
                        title={user.username}
                        expanded={expandedIds.has(user.email)}
                        onPress={() => handlePress(user.email)}
                        style={{
                            backgroundColor: theme.colors.listItem,
                            borderRadius: 10,
                            borderBottomEndRadius: expandedIds.has(user.email) ? 0 : 10,
                            borderBottomStartRadius: expandedIds.has(user.email) ? 0 : 10,
                        }}
                        onLongPress={() => navigation.navigate('QualificacionsSection', { source: 'AlumSection'})}
                    >
                        <Text style={{ padding: 10, color: theme.colors.primary, fontSize: 18 }}>
                            Email: {user.email}
                        </Text>
                        <Text style={{ padding: 10, color: theme.colors.primary, fontSize: 18 }}>
                            Role: {user.role.name}
                        </Text>
                    </List.Accordion>
                </View>
            ))}
        </ScrollView>
    );
};

export default AlumSection;

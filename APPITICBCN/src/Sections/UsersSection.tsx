import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { List, Text, IconButton, useTheme } from 'react-native-paper';
import { getAllUsers, deleteUserByEmail } from '../services/adminService';
import { PreferencesContext } from '../index';

const UsersSection = () => {
    const [users, setUsers] = useState([]);
    const [expandedIds, setExpandedIds] = useState(new Set());
    const { theme } = React.useContext(PreferencesContext);

    const handlePress = (email) => {
        const newSet = new Set(expandedIds);
        if (newSet.has(email)) {
            newSet.delete(email);
        } else {
            newSet.add(email);
        }
        setExpandedIds(newSet);
    };

    const handleDelete = async (email) => {
        try {
            await deleteUserByEmail(email);
            setUsers(users.filter(user => user.email !== email));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        getAllUsers().then(setUsers).catch(console.error);
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
                        right={() => (
                            user.role.name !== 'ROLE_ADMIN' && (
                                <IconButton
                                    icon="delete"
                                    color={theme.colors.error}
                                    onPress={() => handleDelete(user.email)}
                                />
                            )
                        )}
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
}

export default UsersSection;

import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { PreferencesContext } from '../index';
import { KeyboardTypeOptions } from 'react-native';
import { getAllUsers } from '../services//adminService'; // Importa el método getAllUsers

const UsersSection = () => {
    const [users, setUsers] = React.useState([]); // Crea un estado para los usuarios

    React.useEffect(() => {
        // Cuando el componente se monta, obtén todos los usuarios
        getAllUsers().then(data => {
            setUsers(data); // Actualiza el estado con los datos de los usuarios
        });
    }, []); // El array vacío significa que este efecto se ejecuta solo una vez, cuando el componente se monta

    return (
        <ScrollView style={{ padding: 20 }}>
            {users.map((user, index) => (
                <View key={index}>
                    <Text>Username: {user.username}</Text>
                    <Text>Email: {user.email}</Text>
                    <Text>Role: {user.role.name}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

export default UsersSection;
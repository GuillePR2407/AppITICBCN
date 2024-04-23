import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { PreferencesContext } from '../index';
import { KeyboardTypeOptions } from 'react-native';

const UsersSection = () => {
    return (
        <ScrollView style={{ padding: 20 }}>
            <Text>Usuari</Text>
        </ScrollView>
    );
}

export default UsersSection;

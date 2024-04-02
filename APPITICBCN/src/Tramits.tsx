import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { useExampleTheme } from './index';

const Tramits = () => {

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ width: '80%', alignSelf: 'center' }}>
                <TextInput
                    label="Hola"
                />
            </View>
        </View>
    );
};  

export default Tramits;

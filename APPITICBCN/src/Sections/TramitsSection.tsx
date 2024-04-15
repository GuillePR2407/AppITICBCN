import { Background } from '@react-navigation/elements';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';

import itemsData from '../data/tramitsData.json';

import { PreferencesContext } from '../index';

const TramitsSection = () => {

    const { theme } = React.useContext(PreferencesContext);
    
    type NewsNavigationProp = StackNavigationProp<RootStackParamList, 'TramitsSection'>

    const navigation = useNavigation<NewsNavigationProp>();

    return (
    <ScrollView>
        {itemsData.map((item) => (
        <List.Item
            key={item.id}
            title={item.title}
            left={(props) => <List.Icon {...props} icon={item.icon} />}
            style={{backgroundColor: theme.colors.listItem, margin:15, marginBottom:0, borderRadius:10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                // Estilo de sombreado para Android
                elevation: 4,
            }}
            onPress={() => navigation.navigate('TramitsItem', {
            titulo: item.title,
            subtitulo: item.subtitle,
            texto: item.text,
            })}
        />
        ))}
    </ScrollView>
    );
}

export default TramitsSection;

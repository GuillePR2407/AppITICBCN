import { Background } from '@react-navigation/elements';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';

const itemsData = [
    {
        id: 1,
        title: "Primera info",
        subtitle: "Subtítulo de la primera info",
        text: "Texto de ejemplo para la primera información. Aquí puedes añadir más detalles.",
        icon: "information-outline",
    },
    {
        id: 2,
        title: "Segunda info",
        subtitle: "Subtítulo de la segunda info",
        text: "Texto de ejemplo para la segunda información. Aquí puedes añadir más detalles.",
        icon: "information-outline",
    },
    {
        id: 3,
        title: "Tercera info",
        subtitle: "Subtítulo de la tercera info",
        text: "Texto de ejemplo para la tercera información. Aquí puedes añadir más detalles.",
        icon: "information-outline",
    },
];

const InfoSection = () => {
    const theme = useTheme();
    
    type NewsNavigationProp = StackNavigationProp<RootStackParamList, 'InfoSection'>

    const navigation = useNavigation<NewsNavigationProp>();

    return (
    <ScrollView>
        {itemsData.map((item) => (
        <List.Item
            key={item.id}
            title={item.title}
            left={(props) => <List.Icon {...props} icon={item.icon} />}
            style={{backgroundColor: theme.colors.onSecondary, margin:15, marginBottom:0, borderRadius:10}}
            onPress={() => navigation.navigate('InfoItem', {
            titulo: item.title,
            subtitulo: item.subtitle,
            texto: item.text,
            })}
        />
        ))}
    </ScrollView>
    );
}

export default InfoSection;

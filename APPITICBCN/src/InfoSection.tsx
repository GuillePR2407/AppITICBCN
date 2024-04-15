import { Background } from '@react-navigation/elements';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { List, useTheme } from 'react-native-paper';

const itemsData = [
{
    id: 1,
    title: "Primera info",
    icon: "information-outline",
},
{
    id: 2,
    title: "Segunda info",
    icon: "information-outline",
},
{
    id: 3,
    title: "Tercera info",
    icon: "information-outline",
},
];

const InfoSection = () => {

    const theme = useTheme();

    return (
        <ScrollView>
            {itemsData.map((item) => (
                <List.Item
                    key={item.id} 
                    title={item.title}
                    left={(props) => <List.Icon {...props} icon={item.icon} />}
                    style={{backgroundColor: theme.colors.onSecondary, margin:15, marginBottom:0, borderRadius:10}}
                />
            ))}
        </ScrollView>
    );
}

export default InfoSection;


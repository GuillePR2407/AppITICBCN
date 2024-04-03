import * as React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

const InfoSection = () => {

    return (
        <ScrollView>
            <List.Item
                title={"First Item"}
                style={{ backgroundColor: '#30efbc' }}
            />
        </ScrollView>)
}

export default InfoSection;

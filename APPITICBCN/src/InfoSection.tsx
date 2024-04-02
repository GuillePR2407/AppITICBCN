import * as React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

const InfoSection = () => {

    return (
        <ScrollView>
            <List.Item
                title="First Item"
                description="Item description"
                left={props => <List.Icon {...props} icon="folder" />}
            />
        </ScrollView>)
}

export default InfoSection;

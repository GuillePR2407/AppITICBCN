import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, Button, Card, Text, Paragraph, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';

import newsData from './data/newsData.json';




const NewsSection = () => {
  type NewsNavigationProp = StackNavigationProp<RootStackParamList, 'NoticiaItem'>

  const navigation = useNavigation<NewsNavigationProp>();
  
  return (
    <ScrollView>
      {newsData.map((newsItem) => (
        <TouchableRipple
          key={newsItem.id}
          onPress={() => {
            if (newsItem.contentUrl) {
              navigation.navigate('NoticiaItem', { url: newsItem.contentUrl });
            }
          }}
          rippleColor="rgba(0, 0, 0, .32)"
          style={{ margin: 10 }}
        >
          <Card>
            <Card.Cover source={{ uri: newsItem.imageUrl }} />
            <Card.Content>
              <Text variant="titleLarge" style={{ marginVertical: 8, marginTop: 15 }}>{newsItem.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar.Icon size={24} icon="account" style={{ marginRight: 8 }} />
                <Paragraph>
                  {newsItem.userName}
                  {"  "}
                </Paragraph>
                <Avatar.Icon size={24} icon="calendar" style={{ marginRight: 8 }} />
                <Paragraph>
                  {newsItem.publicationDate}
                </Paragraph>
              </View>
            </Card.Content>
          </Card>
        </TouchableRipple>
      ))}
    </ScrollView>)
}


export default NewsSection;

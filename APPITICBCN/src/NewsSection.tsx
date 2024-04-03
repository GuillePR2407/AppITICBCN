import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, Button, Card, Text, Paragraph, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';

const newsData = [
  {
    id: 1,
    title: "Título de la noticia 1",
    userName: "Usuario1",
    publicationDate: "24/03/2024",
    content: "Este es el contenido de la noticia 1.",
    imageUrl: "https://agora.xtec.cat/iticbcn/wp-content/uploads/usu2389/2024/03/Purple-Geometric-Pottery-Workshop-Twitter-Post.png",
    contentUrl: "https://agora.xtec.cat/iticbcn/portada/preinscripcio-2024-2025-terminis-requisits-i-resta-dinformacio/",  
  },
  {
    id: 2,
    title: "Título de la noticia 2",
    userName: "Usuario1",
    publicationDate: "24/03/2024",
    content: "Este es el contenido de la noticia 2.",
    imageUrl: "https://picsum.photos/700?image=2",
    contentUrl: "https://agora.xtec.cat/iticbcn/portada/preinscripcio-2024-2025-terminis-requisits-i-resta-dinformacio/",  
  },
  {
    id: 3,
    title: "Título de la noticia 3",
    userName: "Usuario2",
    publicationDate: "24/03/2024",
    content: "Este es el contenido de la noticia 3.",
    imageUrl: "https://picsum.photos/700?image=3",
    contentUrl: "https://agora.xtec.cat/iticbcn/portada/preinscripcio-2024-2025-terminis-requisits-i-resta-dinformacio/",  
  },
  // Añade más noticias según sea necesario
];




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
              <Paragraph style={{ marginTop: 8 }}>{newsItem.content}</Paragraph>
            </Card.Content>
          </Card>
        </TouchableRipple>
      ))}
    </ScrollView>)
}


export default NewsSection;

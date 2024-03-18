import * as React from 'react';
import { ScrollView } from 'react-native';
import { Avatar, Button, Card, Text, Paragraph } from 'react-native-paper';

// Supongamos que tienes algunos datos de noticias como este
const newsData = [
  {
    id: 1,
    title: "Título de la noticia 1",
    userName: "Usuario1",
    publicationDate: "24/03/2024",
    content: "Este es el contenido de la noticia 1.",
    imageUrl: "https://picsum.photos/700?image=1",
  },
  {
    id: 2,
    title: "Título de la noticia 2",
    userName: "Usuario1",
    publicationDate: "24/03/2024",
    content: "Este es el contenido de la noticia 2.",
    imageUrl: "https://picsum.photos/700?image=2",
  },
  {
    id: 3,
    title: "Título de la noticia 3",
    userName: "Usuario2",
    publicationDate: "24/03/2024",
    content: "Este es el contenido de la noticia 3.",
    imageUrl: "https://picsum.photos/700?image=3",
  },
  // Añade más noticias según sea necesario
];

const NewsSection = () => (
  <ScrollView>
    {newsData.map((newsItem) => (
      <Card key={newsItem.id} style={{ margin: 10 }}>
        <Card.Cover source={{ uri: newsItem.imageUrl }} />
        <Card.Content>
          <Text variant="titleLarge" style={{ marginVertical: 8 }}>{newsItem.title}</Text>
          <Paragraph>
            <Avatar.Icon size={24} icon="account" style={{ marginRight: 8 }} />
            {newsItem.userName}
            {"  "}
            <Avatar.Icon size={24} icon="calendar" style={{ marginRight: 8 }} />
            {newsItem.publicationDate}
          </Paragraph>
          <Paragraph style={{ marginTop: 8 }}>{newsItem.content}</Paragraph>
        </Card.Content>
      </Card>
    ))}
  </ScrollView>
);

export default NewsSection;
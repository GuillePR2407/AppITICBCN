import { Background } from '@react-navigation/elements';
import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { List, useTheme, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import { PreferencesContext } from '../index';

import qualificacionsData from '../data/qualificacionsData.json';

interface QualificacionsSectionProps {
    route?: {
        params?: {
            source?: string; 
        };
    };
}

const QualificacionsSection: React.FC<QualificacionsSectionProps> = ({ route }) => {
    
    const { theme } = React.useContext(PreferencesContext);
    const [expandedIds, setExpandedIds] = React.useState(new Set());
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handlePress = (id) => {
        const newSet = new Set(expandedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedIds(newSet);
    };

    return (
        <ScrollView>
            <Appbar.Header>
                {route?.params?.source === 'AlumSection' ? ( // Si la fuente es AlumSection, mostrar el botón de retroceso
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                ) : <Appbar.Content title="Els teus moduls" style={{ alignItems: 'center', justifyContent: 'center' }} />}
            </Appbar.Header>
            {qualificacionsData.map((item) => (
                <View
                    key={item.id}
                    style={{
                        backgroundColor: theme.colors.listItem,
                        margin: 15,
                        marginTop: 15,
                        marginBottom: 0,
                        borderRadius: 10,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                        elevation: 4,
                    }}
                >
                    <List.Accordion
                        title={item.title}
                        description={item.professor}
                        expanded={expandedIds.has(item.id)}
                        onPress={() => handlePress(item.id)}
                        right={() => (
                            <View style={{
                                backgroundColor: theme.colors.quadratNotes,
                                width: 50, 
                                height: 50, 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                borderRadius: 10,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.23,
                                shadowRadius: 2.62,
                                elevation: 4
                            }}>
                                <Text style={{
                                    color: theme.colors.onQuadratNotes,
                                    fontSize: 20,
                                    fontWeight: '500'
                                }}>
                                    {item.nota}
                                </Text>
                            </View>
                        )}
                        style={{
                            backgroundColor: theme.colors.listItem,
                            borderRadius: 10,
                            borderBottomEndRadius: expandedIds.has(item.id) ? 0 : 10,
                            borderBottomStartRadius: expandedIds.has(item.id) ? 0 : 10,
                        }}
                    >
                        <Text style={{padding: 10, color: theme.colors.primary, fontSize: 18}}>
                            {expandedIds.has(item.id) ? item.description : ""}
                        </Text>
                        {item.ufs.map((uf, index) => (
                            <List.Item
                                key={index}
                                title={uf.name}
                                description={uf.detail}
                                left={props => <List.Icon {...props} icon="book-outline" />}
                                right={() => (
                                    <View style={{
                                        backgroundColor: theme.colors.quadratNotes,
                                        width: 50, 
                                        height: 50, 
                                        justifyContent: 'center', 
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        shadowColor: "#000",
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.23,
                                        shadowRadius: 2.62,
                                        elevation: 4
                                    }}>
                                        <Text style={{
                                            color: theme.colors.onQuadratNotes,
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}>
                                            {uf.nota}
                                        </Text>
                                    </View>
                                )}
                                style={{}}
                            />
                        ))}
                    </List.Accordion>
                </View>
            ))}
        </ScrollView>
    );
}

export default QualificacionsSection;

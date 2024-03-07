import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { View, Text, Image } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomDrawerContent(props: any) {
    const router = useRouter();
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} scrollEnabled={false}
            contentContainerStyle={{ backgroundColor: '#dde3fe' }}>
            
                <View style={{ height:0 }}>
                    <Image source={{ uri: 'https://bsnl.ch/wp-content/uploads/2019/03/avatar-default-circle.png'}} 
                        style={{width: 100, height: 100, alignSelf: 'center'}}/>
                    <Text style={{alignSelf: 'center', paddingTop: 10, fontWeight:'500', fontSize: 18, color:'#5363df'}}>
                        Francisco Jordan
                    </Text>
                </View>
                <View style={{backgroundColor: '#fff', paddingTop: 10}}>
                    <DrawerItemList {...props} />
                    <DrawerItem label={"Logout"} onPress={() => router.replace('/')} style={{height: 0}}/>
                </View>
            </DrawerContentScrollView>
            <View style={{
                borderTopColor: '#dde3fe',
                borderTopWidth: 1,
                padding: 20,
                paddingBottom: 20 + bottom,
            }}>
                <Text>Footer</Text>
            </View>
        </View>
    )
}
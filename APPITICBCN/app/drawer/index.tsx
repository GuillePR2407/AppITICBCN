import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { View, Text, Button } from "react-native"

const Page = () => {

    const navigation = useNavigation();

    const onToggle = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Index</Text>
            <Button title="Open Drawer" onPress={onToggle} />
        </View>
    );
};
export default Page;
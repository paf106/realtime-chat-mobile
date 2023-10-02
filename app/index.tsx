import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useQuery} from "convex/react";
import {api} from "../convex/_generated/api";
import {Link} from "expo-router";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from 'react-native-dialog';

export default function Index() {

    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const groups = useQuery(api.groups.get)

    // Check if the user has a name, otherwise show modal
    useEffect(() => {
        const loadUser = async () => {
            const user = await AsyncStorage.getItem('user');
            if (!user) {
                setTimeout(() => {
                    setVisible(true);
                }, 100);
            } else {
                setName(user);
            }
        };
        loadUser();
    }, []);

    // Safe the username to async storage
    const setUser = async () => {
        let r = (Math.random() + 1).toString(36).substring(7);
        const userName = `${name}#${r}`;
        await AsyncStorage.setItem('user', userName);
        setName(userName);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Groups</Text>
            <ScrollView>
                {groups?.map((group) => (
                    <Link href={{pathname: '/(chat)/[chatId]', params: {chatId: group._id}}} key={group._id} asChild>
                        <TouchableOpacity style={styles.group}>
                            <Image source={ {uri: group.icon_url}} style={{width: 50, height: 50}}/>
                            <View>
                                <Text style={styles.groupName}>{group.name}</Text>
                                <Text style={styles.groupDescription}>{group.description}</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                ))}
            </ScrollView>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Username required</Dialog.Title>
                <Dialog.Description>Please insert a name to start chatting.</Dialog.Description>
                <Dialog.Input onChangeText={setName} />
                <Dialog.Button label="Set name" onPress={setUser} />
            </Dialog.Container>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F5EA',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',

    },
    group: {
        marginHorizontal: 15,
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        elevation: 3,

    },
    groupName: {

        fontWeight: 'bold',
    },
    groupDescription: {

    },

})
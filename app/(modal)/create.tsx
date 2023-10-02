import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {useRouter} from "expo-router";
import {useMutation} from "convex/react";
import {api} from "../../convex/_generated/api";

export default function Create() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [iconUrl, setIconUrl] = useState('')
    const router = useRouter()
    const startGroup = useMutation(api.groups.createGroup)

    const onCreateGroup = async () => {
        await startGroup({
            name,
            description,
            icon_url: iconUrl
        })
        router.back()
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text>Name</Text>
            <TextInput value={name} onChangeText={setName} style={styles.textInput}/>

            <Text>Description</Text>
            <TextInput value={description} onChangeText={setDescription} style={styles.textInput}/>

            <Text>Icon URL</Text>
            <TextInput value={iconUrl} onChangeText={setIconUrl} style={styles.textInput}/>

            <TouchableOpacity onPress={onCreateGroup} style={styles.button}>
                <Text style={styles.buttonText}>Create Group</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: '#F8F5EA',
    },
    textInput: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        minHeight: 40,
    },
    button: {
        backgroundColor: '#EEA217',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }


})
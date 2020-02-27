import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';

export default function Home({ navigation }) {

    const [pokemon, setPokemon] = useState("");

    return (
        <View style={styles.container}>
            <Text>Enter Pokemon:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(val) => setPokemon(val)}
                placeholder="e.g. Pikachu"
            />
            <Text>{pokemon}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    input: {
        borderColor: '#777',
        borderWidth: 1,
        padding: 8,
        margin: 10,
        width: 200
    }
});

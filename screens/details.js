import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Details({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>{navigation.getParam('title')}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    item: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 24,
        padding: 30,
        backgroundColor: 'pink',
        fontSize: 24,
    },
});
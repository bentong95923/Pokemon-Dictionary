import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { FlatList } from 'react-native-gesture-handler';

const Get_POKEMON_INFO = gql`
query {
    pokemon(name: "Pikachu") {
    name
    id
    image
    weight {
      minimum
      maximum
    }
		attacks {
      fast {
        name
        type
        damage
      }
      special {
        name
        type
        damage
      }
    }
    evolutions {
      name
      id
    }
  }
}
`

export default function Home({ navigation }) {

    const [pokemon, setPokemon] = useState("");

    return (
        <View style={styles.container}>
            <Query query={Get_POKEMON_INFO}>
                {(response, error) => {
                    if (error) {
                        console.log('Response Error---------', error);
                        return (<Text>{error}</Text>);
                    }
                    if (response) {
                        console.log('response-data----------', response);
                        // Return the FlatList if there is not an error
                        return (<Text>Success!</Text>);
                    }
                }}
            </Query>
            <Text>Enter Pokemon:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(val) => setPokemon(val)}
                placeholder="e.g. Pikachu"
            />
            <Text>{pokemon}</Text>
            <Button title='Go' />
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

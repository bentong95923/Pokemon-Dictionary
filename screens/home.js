import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { FlatList } from 'react-native-gesture-handler';

export default function Home({ navigation }) {

    const [pokemonSearchName, setPokemonSearchName] = useState("");
    const [pokemon, setPokemon] = useState([]);
    fetchPokemon = (pokemon) => {
        const Get_POKEMON_INFO = gql`
        {
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
        return (
            <Query query={Get_POKEMON_INFO}>
                {(response, error) => {
                    if (error) {
                        // console.log('Response Error---------', error);
                        return (<Text>{error}</Text>);
                    } else if (response.data) {
                        // console.log('response-data----------', response);
                        if (response.data.pokemon !== null) {
                            // Return the FlatList if there is not an error
                            setPokemon(response.data.pokemon);
                            return (<Text>Success!</Text>);
                        }
                    }
                    if (response.data) {
                        // console.log(response.data)
                    } else {
                        // console.log(response);
                    }
                    return (<Text>Failed!</Text>);
                }}
            </Query>
        );
    }

    return (
        <View style={styles.container}>
            {fetchPokemon(pokemonSearchName)}
            <Text>Enter Pokemon:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(val) => setPokemonSearchName(val.trim())}
                placeholder="e.g. Pikachu"
            />
            <Text>{(pokemon.id) && "Number: " + pokemon.id}</Text>
            <Text>{(pokemon.name) && "Name: " + pokemon.name}</Text>
            <View>
                {pokemon.image &&
                    <Image
                        style={{ width: "auto", height: 300 }}
                        source={{ uri: pokemon.image }}
                    />}
                {console.log(pokemon.image)}
            </View>
            <Button title='More details'/>
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

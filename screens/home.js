import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default function Home({ navigation }) {

    const [pokemonSearchName, setPokemonSearchName] = useState("");
    const [pokemon, setPokemon] = useState([]);
    
    const fetchPokemon = (poke) => {
        // GraphQL
        const GET_POKEMON_DETAILS = gql`
        {
            pokemon(name: "${poke}") {
                name
                id
                image
                weight {
                    minimum
                    maximum
                }
                height {
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
        `;
        // Find Pokemon status message
        let msg = "";
        return (
            // Run query and store results
            <Query query={GET_POKEMON_DETAILS}>
                {(response, error) => {
                    if (error) {
                        return (<Text>{error}</Text>);
                    } else if (response.data) {
                        if (response.data.pokemon !== null) {
                            // Return the FlatList if there is not an error
                            setPokemon(response.data.pokemon);
                            msg = "Pokemon found!";
                        }
                    }
                    return (<Text>{msg}</Text>);
                }}
            </Query>
        );
    }

    const onChangeInputText = (val) => {
        if (val.trim().length >= 3) {
            setPokemonSearchName(val.trim());
        } else {
            setPokemonSearchName([]);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Enter Pokemon:</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeInputText}
                placeholder="e.g. Pikachu"
            />
            {fetchPokemon(pokemonSearchName)}
            <Text>{(pokemon.id) && "Number: " + pokemon.id}</Text>
            <Text>{(pokemon.name) && "Name: " + pokemon.name}</Text>
            <View>
                {pokemon.image &&
                    <Image
                        style={{ width: "auto", height: 300, resizeMode: 'contain'}}
                        source={{ uri: pokemon.image }}
                    />}
            </View>
            {pokemon.id && <Button title='Pokemon details' onPress={() => navigation.navigate("Pokemon Details", pokemon)} />}
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

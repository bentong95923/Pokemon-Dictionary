import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default function Details({ navigation }) {

    const fetchEvolutionsImage = (pokeID) => {
        // GraphQL for getting envolutions image
        const GET_EVOLUTION_IMAGE_BY_ID = gql`
        {
            pokemon(id: "${pokeID}") {
            image
            }
        }        
        `;
        return (
            // Run Query
            <Query query={GET_EVOLUTION_IMAGE_BY_ID}>
                {(response, error) => {
                    if (error) {
                        return (<Text>{error}</Text>);
                    } else if (response.data) {
                        if (response.data.pokemon !== null) {
                            // Return the FlatList if there is not an error
                            return (
                                <Image style={{ width: "auto", height: 50, resizeMode: 'contain' }} source={{ uri: response.data.pokemon.image }} />
                            );
                        }
                    }
                    return (<Text>Loading...</Text>);
                }}
            </Query>
        );
    }

    return (
        <View style={styles.container}>
            <Text>Details for {navigation.getParam('name')}:</Text>
            <Text>------------ Weight ------------</Text>
            <Text>
                - {"From " +
                    navigation.getParam('weight').minimum
                    + " to " +
                    navigation.getParam('weight').maximum
                }
            </Text>
            <Text>------------ Height ------------</Text>
            <Text>
                - {"From " +
                    navigation.getParam('height').minimum
                    + " to " +
                    navigation.getParam('height').maximum
                }
            </Text>
            <Text> ------------ Attacks ------------</Text>
            <Text>
                - Fast:
            </Text>
            {navigation.getParam('attacks').fast.map((val) => (
                <Text>* {val.name + ", " + val.type + ", " + val.damage + "pt damage"}</Text>
            ))}
            <Text>
                - Special:
            </Text>
            {navigation.getParam('attacks').special.map((val) => (
                <Text>* {val.name + ", " + val.type + ", " + val.damage + "pt damage"}</Text>
            ))}
            <Text> ------------ Evolutions ------------ </Text>
            {navigation.getParam('evolutions') !== null ?

                <FlatList
                    data={navigation.getParam('evolutions')}
                    renderItem={({ item }) => (
                        <View>
                            <Text>- {item.name} </Text>
                            {/* Get Evolutions Image */}
                            {fetchEvolutionsImage(item.id)}
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
                :
                <Text>None</Text>
            }
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
})

import React, { useState } from 'react';
import Navigator from './routes/homeStack';
import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    link: new HttpLink({ uri: "https://graphql-pokemon.now.sh/" }),
    cache: new InMemoryCache()
});

export default App = () => (
    <ApolloProvider client={client}>
        <Navigator />
    </ApolloProvider>
);
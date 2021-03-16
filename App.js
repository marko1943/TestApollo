import React from 'react';
import {AppRegistry, Button} from 'react-native';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from '@apollo/react-components';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';

import gql from 'graphql-tag';
import {Mutation} from '@apollo/react-components';

const REGISTER = gql`
  mutation register(
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    register(
      email: $email
      password: $password
      passwordConfirm: $passwordConfirm
    ) {
      id
      email
      firstName
      lastName
      city
      gender
      dateOfBirth
      deliveryAddress
      profileImage
      contactPhone
      description
      clothesSize
      shoeSize
      userInfo
      token
      type
    }
  }
`;

// Create the client as outlined in the setup guide
// Instantiate required constructor fields
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://127.0.0.1:8000/graphiql',
});
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: link,

  // Provide some optional constructor fields
  connectToDevTools: true,
  defaultOptions,
});

const MyRootComponent = () => {
  return (
    <Mutation mutation={REGISTER}>
      {(register, {data}) => (
        <Button
          onPress={() => {
            register({
              variables: {
                email: 'user@test.de',
                password: 'Test123!',
                passwordConfirm: 'Test123!',
              },
            });
          }}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      )}
    </Mutation>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <MyRootComponent />
  </ApolloProvider>
);

AppRegistry.registerComponent('MyApplication', () => App);

export default App;

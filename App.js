import React from 'react';
import {AppRegistry, Button} from 'react-native';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from '@apollo/react-components';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink, createHttpLink} from 'apollo-link-http';

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

// const client = new ApolloClient({
//   // Provide required constructor fields
//   cache: cache,
//   link: link,
// });

const customFetch = (uri, options) => {
  return fetch(uri, options).then(response => {
    if (response.status >= 500) {
      // or handle 400 errors
      return Promise.reject(response.status);
    }
    return response;
  });
};
const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://192.168.0.13:8000/graphql',
    fetch: customFetch,
  }),
  cache: new InMemoryCache(),
});

const MyRootComponent = () => {
  return (
    <Mutation mutation={REGISTER}>
      {(register, {data, error}) => {
        console.log(data);
        console.log(error);
        return (
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
        );
      }}
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

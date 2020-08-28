import ApolloClient from 'apollo-boost';

import gql from 'graphql-tag';

import Swal from 'sweetalert2'

const API_URL = 'http://localhost:3001/graphql/';
const client = new ApolloClient({
   uri: API_URL
});



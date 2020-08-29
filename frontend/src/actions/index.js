import ApolloClient from 'apollo-boost';

import gql from 'graphql-tag';


const API_URL = 'http://localhost:3001/graphql/';
const client = new ApolloClient({
   uri: API_URL
});

// LOAD CONTACT
export const loadContactsSucces = (phones) => ({
   type: 'LOAD_CONTACT_SUCCES',
   phones
})

export const loadContactsFailure = () => ({
   type: 'LOAD_CONTACT_FAILURE',
})

export const loadContacts = (offset = 0, limit = 5) => {

   const phonesQuery = gql`
   query{
      phones(pagination: {offset: ${offset}, limit: ${limit}}) {
         count
         items{
            id
            name
            phone
         }
      }
   }`;

   return dispatch => {
      return client.query({
         query: phonesQuery
      })
         .then(function (response) {
            dispatch(loadContactsSucces(response.data.phones))
         })
         .catch(function (error) {
            console.log(error);
            dispatch(loadContactsFailure)
         })
   }

}

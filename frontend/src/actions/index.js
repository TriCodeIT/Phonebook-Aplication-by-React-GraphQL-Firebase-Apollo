import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const API_URL = 'http://localhost:3001/graphql/';
const client = new ApolloClient({
   uri: API_URL
});

// LOAD CONTACTS START
export const loadContactsSuccess = (phones) => ({
   type: 'LOAD_CONTACT_SUCCESS',
   phones
})

export const loadContactsFailure = () => ({
   type: 'LOAD_CONTACT_FAILURE'
})

export const loadContacts = (offset = 0, limit = 5) => {

   const phonesQuery = gql`
   query{
      phones(pagination:{offset: ${offset}, limit:${limit}}){
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
            dispatch(loadContactsSuccess(response.data.phones))
         })
         .catch(function (error) {
            console.log(error);
            dispatch(loadContactsFailure())
         })
   }
}
//LOAD CONTACTS END

//SEARCH CONTACTS START
export const searchContacts = (name, phone, offset = 0, limit = 5) => {

   const searchQuery = gql`
   query 
      phones(
         $name : String!, 
         $phone: String!
         $offset : Int!
         $limit : Int!
      ){
         phones(
         name : $name,
         phone: $phone,
         pagination : {
            offset : $offset,
            limit : $limit
         }
         ){
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
         query: searchQuery,
         variables: {
            name,
            phone,
            offset,
            limit
         }
      })
         .then(function (response) {
            dispatch(loadContactsSuccess(response.data.phones))
         })
         .catch(function (error) {
            console.log(error);
            dispatch(loadContactsFailure)
         })
   }

}
//SEARCH CONTACTS END

//ON SEARCH
export const onSearch = (filter) => ({
   type: 'ON_SEARCH',
   filter
})

//PAGINATION ACTIONS START
export const previousPage = () => ({
   type: 'PREVIOUS_PAGE'
})

export const changePage = (page) => ({
   type: 'CHANGE_PAGE',
   page
})

export const nextPage = () => ({
   type: 'NEXT_PAGE'
})
//PAGINATION ACTIONS END









import ApolloClient from 'apollo-boost';

import gql from 'graphql-tag';

import Swal from 'sweetalert2';

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



//START POST CONTATCTS
const postContactSuccess = (contact) => ({
   type: 'POST_CONTACT_SUCCESS',
   contact
})

const postContactFailure = (id) => ({
   type: 'POST_CONTACT_FAILURE',
   id
})

const postContactRedux = (id, name, phone) => ({
   type: 'POST_CONTACT',
   id, name, phone
})

export const postContact = (name, phone) => {
   const id = new Date().getTime();
   const addQuery = gql`
        mutation addContact($id: ID!, $name: String!, $phone: String!) {
            addContact(id: $id, name: $name, phone: $phone) {
                id
                name
                phone
            }
        }`;

   return dispatch => {
      dispatch(postContactRedux(id, name, phone));

      return client.mutate({
         mutation: addQuery,
         variables: {
            id,
            name,
            phone
         }
      })
         .then(function (response) {
            Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Contact added successfully!',
               showConfirmButton: false,
               timer: 1200
            })
            dispatch(postContactSuccess(response.data.addContact))
         })
         .catch(function (error) {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Something went wrong! check your connection',
               showConfirmButton: true
            })
            dispatch(postContactFailure(id))
         })
   }

}
//POST CONTATCTS END



//START RESEND CONTACT
export const resendContact = (id, name, phone) => {
   const addQuery = gql`
        mutation addContact($id: ID!, $name: String!, $phone: String!) {
            addContact(id: $id, name: $name, phone: $phone) {
                id
                name
                phone
            }
        }`;
   return dispatch => {
      return client.mutate({
         mutation: addQuery,
         variables: {
            id,
            name,
            phone
         }
      })
         .then(function (response) {
            Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Contact added successfully!',
               showConfirmButton: false,
               timer: 1000
            })
            dispatch(postContactSuccess(response.data.addContact))
         })
         .catch(function (error) {
            Swal.fire({
               icon: 'error',
               title: 'There is a problem',
               text: 'Something went wrong! check your connection',
               showConfirmButton: true
            })
            dispatch(postContactFailure(id))
         })
   }
}
//RESEND CONTACT END



//START DELETE CONTACT DATA
const deleteContactRedux = (id) => ({
   type: 'DELETE_CONTACT',
   id
})

export const deleteContactSuccess = (id) => ({
   type: 'DELETE_CONTACT_SUCCESS',
   id
})

export const deleteContactFailure = () => ({
   type: 'DELETE_CONTACT_FAILURE'
})

export const deleteContact = (id) => {
   const deleteQuery = gql`
   mutation deleteContact($id: ID!) {
     deleteContact(id: $id) {
       id
     }
   }`;
   return dispatch => {
      Swal.fire({
         icon: 'warning',
         title: "Are you sure delete this Contact?",
         text: "You can't revert this action",
         type: "warning",
         showCancelButton: true,
         confirmButtonText: "Yes Delete Contact!",
         cancelButtonText: "No, Keep Contact!",
         showCloseButton: true,
         showLoaderOnConfirm: true
      }).then(result => {
         if (result.value) {
            dispatch(deleteContactRedux(id))
            return client.mutate({
               mutation: deleteQuery,
               variables: {
                  id
               }
            })
               .then(function (response) {
                  dispatch(deleteContactSuccess(response))
               })
               .catch(function (error) {
                  dispatch(deleteContactFailure())
               });
         }
      })
   }
}
//DELETE CONTACT DATA END









const initState = {
  contacts: [],
  page: 1,
  pages: 0,
  isSearch: false,
  filtername: '',
  filterPhone: ''
}

const contacts = (state = initState, action) => {
  switch (action.type) {

    case 'LOAD_CONTACT_SUCCESS':
      return {
        ...state,
        contacts: action.phones.items.map((item) => {
          item.sent = true;
          return item
        }),
        pages: Math.ceil(action.phones.count / 5)
      }



    case 'ON_SEARCH':
      return {
        ...state,
        isSearch: true,
        filtername: action.filter.name,
        filterPhone: action.filter.phone
      }



    case 'NEXT_PAGE':
      return {
        ...state,
        page: state.page + 1
      }


    case 'PREVIOUS_PAGE':
      return {
        ...state,
        page: state.page - 1
      }


    case 'CHANGE_PAGE':
      return {
        ...state,
        page: action.page
      }



      case 'POST_CONTACT':
        return {
           ...state,
           contacts: [
              ...state.contacts,
              {
                 id: action.id,
                 name: action.name,
                 phone: action.phone,
                 sent: true
              }
           ]
        }

     case 'POST_CONTACT_SUCCESS':
        return {
           ...state,
           contacts: state.contacts.map(item => {
              item.sent = true;
              return item
           })
        }

     case 'POST_CONTACT_FAILURE':
        return {
           ...state,
           contacts: state.contacts.map((item) => {
              if (item.id === action.id) {
                 item.sent = false;
              }
              return item
           })
        }


    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((item) => item.id !== action.id)
      }

    case 'DELETE_CONTACT_SUCCES':
      return state

    case 'LOAD_CONTACT_FAILURE':
    case 'DELETE_CONTACT_FAILURE':
    default:
      return state
  }
}

export default contacts

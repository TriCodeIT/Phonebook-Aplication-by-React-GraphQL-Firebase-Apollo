const initState = {
  contacts: [],
  page: 1,
  pages: 0,
  isSearch: false,
  filterName: '',
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
        filterName: action.filter.name,
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

    case 'LOAD_CONTACT_FAILURE':
    default:
      return state
  }
}

export default contacts

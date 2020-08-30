import { connect } from 'react-redux'

import { resendContact, deleteContact } from '../actions';

import Contact from '../components/Contact'

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: () => dispatch(deleteContact(ownProps.id)),
  onResend: () => dispatch(resendContact(ownProps.id, ownProps.name, ownProps.phone))
})

export default connect(
  null,
  mapDispatchToProps
)(Contact)

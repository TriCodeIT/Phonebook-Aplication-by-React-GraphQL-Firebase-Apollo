import React, { Component } from 'react';

import Contact from './ContactActive'

import { connect } from 'react-redux';

import { loadContacts } from '../actions';

class ContactList extends Component {

    componentDidMount(){
      this.props.loadContacts();
    }
  
    render(){
      const nodes = this.props.contacts.map((item, index)=>{
        return (
          <Contact
          key={index}
          index={this.props.page === 1 ? index + 1: (this.props.page - 1) * 5 + (index + 1)}
          id={item.id}
          name={item.name}
          phone={item.phone}
          sent={item.sent}
          />)
        })

        return(
            <div className="contact-list" style={{ fontFamily: "Roboto" }}>
            <table className="table">
               <thead className="thead-dark" style={{ fontSize: "19px" }}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {nodes}
              </tbody>
            </table>
         </div >
        )
      }
    }
  
    const mapStateToProps = (state) => ({
      contacts: state.contacts.contacts,
    })
  
    const mapDispatchToProps = (dispatch) => ({
      loadContacts: () => dispatch(loadContacts())
    })
  
    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(ContactList)
  
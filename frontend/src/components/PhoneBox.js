import React from 'react';
import ListContacts from '../containers/ListContacts';
import SearchForm from '../containers/SearchForm';
import Pagination from '../containers/Pagination';
import AddForm from '../containers/AddForm';
import HeaderCard from './HeaderCard';

function PhoneBox() {
  return (
    <div className="container">
      <div className="card bg-light">
        <HeaderCard />
        <div className="card-body">
          <ListContacts />
          <SearchForm />
          <Pagination />
          <AddForm />
        </div>
        <div className="card-footer text-center font-weight-bold">
          Copyright © 2020 TriCodeIT
        </div>
      </div>
    </div>
  )
}

export default PhoneBox;
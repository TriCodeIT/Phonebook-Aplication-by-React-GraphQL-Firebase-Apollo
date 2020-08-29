import React from 'react';
import ListContacts from '../containers/ListContacts';

function PhoneBox() {
    return(
        <div className="container">
          <div className="card">
            <div className="card-header text-center">
              Phone Book Apps
            </div>
            <div className="card-body">
              <ListContacts />
            </div>
            <div className="card-footer text-center">
              Hak Cipta © 2020 TriCodeIT
            </div>
          </div>
        </div>
      )
}

export default PhoneBox;
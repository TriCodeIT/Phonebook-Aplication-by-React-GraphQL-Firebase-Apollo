import React  from 'react';
import Clock from 'react-live-clock';

function HeaderCard() {

    return (

        <div className="card-header text-center font-weight-bold">
            <h1> Phone Book Apps</h1>
            <Clock format={'MMMM Mo YYYY, HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} style={{ fontSize: '20px' }} />
        </div>

    )

}

export default HeaderCard;
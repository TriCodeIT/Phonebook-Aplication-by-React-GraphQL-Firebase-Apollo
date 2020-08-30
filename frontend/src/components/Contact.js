import React from 'react';

const Contact = (props) => {
    return (
        <tr>
            <td >{props.index}</td>
            <td >{props.name}</td>
            <td >{props.phone}</td>

            <td >

            <button type="button" className="btn btn-success" onClick={props.onUpdateContact}><i className="fas fa-pencil-alt"></i> Edit </button>

                {props.sent ?
                    (<button type="button" className="btn btn-danger" onClick={props.onDelete}><i className="fas fa-trash"></i> Delete</button>) : (<button type="submit" className="btn btn-info" onClick={props.onResend}><i className="fas fa-sync-alt"></i>Resend</button>)
                }

            </td>

        </tr>
    )
}

export default Contact;
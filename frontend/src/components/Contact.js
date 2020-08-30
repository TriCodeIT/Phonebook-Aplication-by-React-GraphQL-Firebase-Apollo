import React from 'react';

const Contact = (props) => {
    return (
        <tr>
            <td >{props.index}</td>
            <td >{props.name}</td>
            <td >{props.phone}</td>

            <td >
                {props.sent ?
                    (<button type="button" className="btn" onClick={props.onDelete}><i className="fas fa-trash"></i> Delete</button>) : (<button type="submit" className="btn" onClick={props.onResend}><i className="fas fa-sync-alt"></i>Resend</button>)
                }
            </td>
            
        </tr>
    )
}

export default Contact;
import React from 'react';
import PropTypes from 'prop-types';

export const ContactTable = ({contacts = []}) => {
    return (
        <div>
            <table className="ContactTable">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>PhoneNumber</th>
                </tr>
                </thead>
                <tbody>
                {
                    contacts.map((contact, index) => {
                        return <ContactRow contact={contact} key={index}/>
                    })
                }
                </tbody>
            </table>
        </div>
    )
};

ContactTable.propTypes = {
    contacts: PropTypes.array.isRequired
};

const ContactRow = ({contact}) =>
    <tr>
        <td>{contact.id}</td>
        <td>{contact.name}</td>
        <td>{contact.phoneNumber}</td>
    </tr>
;

ContactRow.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired
    })
};



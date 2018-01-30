import React, {Component} from 'react';
import {ContactTable} from './ContactTable';
import {loadAllContacts} from '../../actions/contacts';
import {ContactSearchField} from "./ContactsFilter";

export default class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterValue: "",
            contacts: [],
            filteredContacts: []
        };
    }

    componentDidMount() {
        loadAllContacts()
            .then(contacts =>
                this.setState({
                        contacts: contacts,
                        filteredContacts: contacts
                    }
                ))
    }

    filterContacts(event) {
        const searchString = (event.target.value || "").toLowerCase();

        this.setState((prevState, props) => {
            return {
                filterValue: searchString,
                filteredContacts: prevState.contacts
                                           .filter(contact => contact.name
                                                                     .toLowerCase()
                                                                     .includes(searchString))
            }
        })
    }

    render() {
        return (
            <div id="ContactPage">
                <ContactSearchField onChangeHandler={this.filterContacts.bind(this)}
                                    filterValue={this.state.filterValue}/>
                <ContactTable contacts={this.state.filteredContacts}/>
            </div>
        );
    }
}
import React, {Component} from 'react';

import './App.css';
import ContactPage from "../components/contacts/index";

class App extends Component {
    render() {
        return (
            <div className="App">
                <ContactPage/>
            </div>
        );
    }
}

export default App;
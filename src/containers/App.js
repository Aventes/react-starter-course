import React, {Component} from 'react';
import Welcome from '../components/welcome/Welcome';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Welcome/>
            </div>
        );
    }
}

export default App;
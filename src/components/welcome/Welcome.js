import React, {Component} from 'react';
import Hello from "./Hello";
import {InputField} from './InputField';

class Welcome extends Component {
    constructor() {
        super();

        this.state = {
            name: "User"
        }
    }

    handleChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    render() {
        return (
            <div>
                <Hello name={this.state.name}/>
                <InputField value={this.state.name}
                            onChange={this.handleChangeName.bind(this)}/>
            </div>
        );
    }
}

export default Welcome;
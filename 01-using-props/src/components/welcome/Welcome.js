import React, {Component} from 'react';
import Hello from "./Hello";
import {InputField} from './InputField';

class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {name: ""};
    }

    componentWillMount(props, state) {
        console.info("componentWillMount called", props);
    }

    componentDidMount(props, state) {
        console.info("componentDidMount called", props, state);
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.info("componentWillReceiveProps called", nextProps, nextState);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.info("shouldComponentUpdate called", nextProps, nextState);
        return true;
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
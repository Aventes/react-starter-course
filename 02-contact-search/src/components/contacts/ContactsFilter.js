import React from 'react';
import PropTypes from 'prop-types';

export const ContactSearchField = ({onChangeHandler, filterValue}) =>
    <div id="ContactSearchField">
        <span>Search by name: </span>
        <input onChange={onChangeHandler} value={filterValue}/>
    </div>
;

ContactSearchField.propTypes = {
    onChangeHandler: PropTypes.func.isRequired,
    filterValue: PropTypes.string,
};
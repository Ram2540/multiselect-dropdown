import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import * as classes from './DropdownCheckbox.module.css'

const dropdownCheckbox = (props) => {
const dropdownCheckboxItemClasses = [classes.CheckboxItem];
if (props.checked) {
    dropdownCheckboxItemClasses.push(classes.CheckboxItemActive);
}
const checkedStyle = {
    color: 'rgb(23,149,244)',
    boxShadow: 'rgb(23, 149, 244) 0px 4px 4px inset,rgb(23, 149, 244) 0px -4px 4px inset',
    padding: '1px',
    borderRadius: '0.2rem',
}
const uncheckedStyle = {
    color: 'rgb(250,251,252)',
    boxShadow: 'inset 0 0 0.5rem rgb(222,222,222)',
    borderRadius: '0.2rem',
    padding: '1px'
}

return (<div className={dropdownCheckboxItemClasses.join(' ')} onClick={() => props.clicked(props.id)}>
    <FontAwesomeIcon
        icon={props.checked ? faCheckSquare : faSquare}
        style={props.checked ? checkedStyle : uncheckedStyle}
        size="lg" />
    <label className={classes.CheckboxItemLabel}>{parse(props.name)}</label>
</div>
)
}

dropdownCheckbox.propTypes = {
checked: PropTypes.bool,
name: PropTypes.string.isRequired,
id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]).isRequired,
clicked: PropTypes.func
}

export default dropdownCheckbox;


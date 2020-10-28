import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import * as classes from './DropdownCheckbox.module.css'

const dropdownCheckbox = (props) => {
    let dropdownCheckboxItemClasses = [classes.CheckboxItem];
    if (props.checked) {
        dropdownCheckboxItemClasses = [classes.CheckboxItem, classes.CheckboxItemActive];
    }

    return (<div className={dropdownCheckboxItemClasses.join(' ')} onClick={() => props.clicked(props.id)}>
        {props.checked ?
            <FontAwesomeIcon
                icon={faCheckSquare}
                style={{
                    color: 'rgb(23,149,244)',
                    padding: '1px'
                }}
                size="lg" /> :
            <FontAwesomeIcon
                icon={faSquare}
                style={{
                    color: 'rgb(250,251,252)',
                    boxShadow: 'inset 0 0 0.2rem rgb(222,222,222)',
                    borderRadius: '0.2rem',
                    padding: '1px'
                }}
                size="lg" />}
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


import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import * as classes from './DropdownCheckbox.module.css'

const dropdownCheckbox = (props) => {
    const dropdownCheckboxItemClasses = [classes.CheckboxItem];
    if (props.checked) {
        dropdownCheckboxItemClasses.push(classes.CheckboxItemActive);
    }

    return (<div className={dropdownCheckboxItemClasses.join(' ')} onClick={() => props.clicked(props.id)}>
            <FontAwesomeIcon 
            className={[classes.CheckBoxIcon, props.checked ? classes.CheckBoxIconActive : null].join(' ')}
            icon={props.checked ? faCheckSquare : faSquare}
            size='lg' 
            />
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


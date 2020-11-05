import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import * as classes from './DropdownFilterButton.module.css'

const dropdownFilterButton = (props) => {
    let buttonFilterClasses = [classes.ButtonFilter, props.isActive ? classes.ButtonFilterActive : null];

    return (
        <Button 
        className={buttonFilterClasses.join(' ')} 
        disabled={!props.isActive} 
        onClick={props.clicked}
        // style={{fontFamily: 'WorkSans-Medium, Work Sans, inherit'}}
        >{props.label}</Button>
    )
}

dropdownFilterButton.propTypes = {
    isActive: PropTypes.bool,
    label: PropTypes.string,
    clicked: PropTypes.func,
}

export default dropdownFilterButton;
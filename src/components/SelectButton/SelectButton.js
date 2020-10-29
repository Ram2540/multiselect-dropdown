import React from 'react'
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

import classes from './SelectButton.module.css'

const selectButton = (props) => (
     <div className={classes.SelectButtonBox} onClick={props.clicked}>
          <FontAwesomeIcon icon={props.isThisAllButton ? faPlusCircle : faTimesCircle} />
          <label className={classes.SelectButtonLabel}>{props.name}</label>
     </div>
)

selectButton.propTypes = {
     clicked: PropTypes.func,
     name: PropTypes.string,
     isThisAllButton: PropTypes.bool
}

export default selectButton;
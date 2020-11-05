import React from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

import * as classes from './DropdownSearch.module.css';

const dropdownSearch = (props) => {

    return (<div className={classes.Search}>
        <FontAwesomeIcon
            className={classes.SearchIcon}
            icon={faSearch}
            size="1x"
        />
        <input
            className={classes.SearchInput}
            type="text"
            placeholder={props.placeholder}
            autoFocus
            onChange={(event) => {
                return props.searchWordChnaged(event.target.value);
            }
            }
        />
    </div>
    )
}

dropdownSearch.propTypes = {
    placeholder: PropTypes.string,
    searchWordChnaged: PropTypes.func
}


export default dropdownSearch;
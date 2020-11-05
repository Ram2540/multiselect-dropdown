import React from 'react'
import PropTypes from 'prop-types';

import DropdownCheckbox from '../DropdownCheckbox/DropdownCheckbox';
import DropdownSearch from '../DropdownSearch/DropdownSearch';
import SelectButton from '../SelectButton/SelectButton';
import DropdownFilterButton from '../DropdownFilterButton/DropdownFilterButton';

import * as classes from './DropdownDropPart.module.css';



const dropDownDropPart = (props) => {

    const searchLabel = props.searchLabel ?? 'Search';
    const selectAllLabel = props.selectAllLabel ?? 'Select all';
    const selectNoneLabel = props.selectNoneLabel ?? 'Select none';
    const filterLabel = props.filterLabel ?? 'Filter';
    return (
        <div className={classes.DropdownDropPartWrapper}>
            <DropdownSearch
                    placeholder={searchLabel}
                    searchWordChnaged={props.handleSearch}
                />
            <div className={classes.DropdownDropPart}>
                <SelectButton 
                    name={selectAllLabel}
                    clicked={props.clickSelectAll}
                    isThisAllButton={true}
                />
                <SelectButton
                    name={selectNoneLabel}
                    clicked={props.clickSelectNone}
                />
                {props.options.map((item) => (
                    <DropdownCheckbox key={item.id}
                        id={item.id}
                        name={item.name}
                        checked={item.checked}
                        clicked={props.checkBoxChange}
                    />
                ))}
            </div>
            <DropdownFilterButton label={filterLabel} isActive={props.isFilterActive} clicked={props.fiterButton} />
        </div>
    )
}

dropDownDropPart.propTypes = {
    options: PropTypes.array.isRequired,
    checkBoxChange: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    clickSelectAll: PropTypes.func,
    clickSelectNone: PropTypes.func,
    isFilterActive: PropTypes.bool,
    fiterButton: PropTypes.func,
    searchLabel: PropTypes.string,
    selectAllLabel: PropTypes.string,
    selectNoneLabel: PropTypes.string,
    filterLabel: PropTypes.string,
};


export default dropDownDropPart;
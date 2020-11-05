/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// libraries
import React, { Component } from 'react';
import Pluralize from 'pluralize';
import { faLink, faTabletAlt, faGlobe, faSortDown, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux'
import { throttle } from 'lodash';
import onClickOutside from "react-onclickoutside";
import _uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';

import DropdownDropPart from '../../components/DropdownDropPart/DropdownDropPart';
import * as dropdownActions from '../../state/actions/dropdownActions'
// styles
import * as classes from './Dropdown.module.css';

/* ========== ~~~~~~~~~~ DROPDOWN ~~~~~~~~~~ ========== */
class DropDown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dropdownId: _uniqueId('dropdownUID-'),
			options: props.options,
			dropdownName: Pluralize.singular(props.dropdownName),
			dropdownPluralName: Pluralize(props.dropdownName),
			selectedValuesLabel: 'All ' + Pluralize(props.dropdownName),
			isOpened: false,
			isFilterActive: false,
			searchWord: null,
		}
	}

	componentDidMount = () => {
		this.props.addDropdownState(this.state.dropdownId);
	}

	componentWillUnmount = () => {
		this.props.removeDropdownState(this.state.dropdownId);
	}

	toggleList = () => {
		this.setState(prevState => ({
			isOpened: !prevState.isOpened,
			searchWord: null
		}))
	}

	handleInputCheckBoxChange = (id) => {
		const updatedOptions = [...this.state.options];
		const option = updatedOptions.find(opt => opt.id === id);
		option.checked = !option.checked;
		this.updateOptionsState(updatedOptions);
	}

	handleSelectAll = () => {
		const updatedOptions = this.getUpdatedOptionsChecked(true);
		this.updateOptionsState(updatedOptions);
	}

	handleSelectNone = () => {
		const updatedOptions = this.getUpdatedOptionsChecked(false);
		this.updateOptionsState(updatedOptions);
	}

	handleSearchChanged = (search) => {
		this.setState({ searchWord: search.toLowerCase() });
	}

	handleSearchChangedThrottled = throttle(this.handleSearchChanged, 700);

	handleClickOutside = evt => {
		if (this.state.isOpened) {
			this.toggleList();
		}
	};

	handleFilterButton = () => {
		this.toggleList();
		this.props.logItems(this.state.dropdownId);
	}

	updateOptionsState = (updatedOptions) => {
		const option = updatedOptions.find(opt => opt.checked);
		const updatedSelectedValuesLabel = this.getSelectedValuesLabel(updatedOptions);
		this.props.addItems(this.state.dropdownId, updatedOptions.filter(opt => opt.checked));
		this.setState({
			options: updatedOptions,
			isFilterActive: !!option,
			selectedValuesLabel: updatedSelectedValuesLabel
		});
	}

	getCurrentIcon = () => {
		switch (Pluralize.singular(this.state.dropdownName)) {
			case 'Country':
				return faGlobe;
			case 'Device':
				return faTabletAlt;
			case 'Site':
				return faLink;
			default:
				return faList;
		}
	}

	getSelectedValuesLabel = (updatedOptions) => {
		const num = updatedOptions.filter(opt => opt.checked).length;
		let selectedLabel = 'All ' + this.state.dropdownPluralName;

		if (num < updatedOptions.length && num > 0) {
			const name = num === 1 ? this.state.dropdownName : this.state.dropdownPluralName;
			selectedLabel = num.toString() + ' ' + name;
		}
		return selectedLabel;
	}

	getAvalibleOptions = () => {
		if (this.state.searchWord) {
			const filteredOptions = this.state.options
				.filter(opt =>
					opt.name.toLowerCase().includes(this.state.searchWord));

			const filteredOptionsBold = filteredOptions.map(o => {
				const index = o.name.toLowerCase().indexOf(this.state.searchWord);
				const hilightedName = o.name.slice(0, index)
					+ '<strong>'
					+ o.name.slice(index, index + this.state.searchWord.length)
					+ '</strong>'
					+ o.name.slice(index + this.state.searchWord.length);
				return {
					...o,
					name: hilightedName
				};
			});
			return filteredOptionsBold;
		}
		return this.state.options;
	}

	getUpdatedOptionsChecked = (checkState) => {
		return this.state.options.map(opt => {
			return {
				...opt,
				checked: checkState
			}
		});
	}

	getDropdownPart = () => {
		let dropPart = null;
		if (this.state.isOpened) {
			const searchLabel = 'Search ' + this.state.dropdownName;
			dropPart = <DropdownDropPart
				options={this.getAvalibleOptions()}
				checkBoxChange={this.handleInputCheckBoxChange}
				searchLabel={searchLabel}
				handleSearch={this.handleSearchChangedThrottled}
				clickSelectAll={this.handleSelectAll}
				clickSelectNone={this.handleSelectNone}
				isFilterActive={this.state.isFilterActive}
				fiterButton={this.handleFilterButton}
			/>
		}
		return dropPart;
	}

	getClassesDropdownMain = () => {
		return [classes.DropdownMain, this.state.isOpened ? classes.DropdownMainActive : null]
	}

	getClassesDropdownLabelSelected = () => {
		return [classes.LabelSelected, this.state.isFilterActive ? classes.LabelSelectedFiltered : null]
	}

	render() {
		return (
			<React.Fragment>
				<div className={classes.DropdownWrapper}>
					<div className={this.getClassesDropdownMain().join(' ')} onClick={this.toggleList}>
						<FontAwesomeIcon 
						    className={classes.DropdownIcon}
							icon={this.getCurrentIcon()}
							/>
						<div className={classes.LabelArea}>
							<label className={classes.LabelMain}>{this.state.dropdownPluralName}</label>
							<label className={this.getClassesDropdownLabelSelected().join(' ')}>{this.state.selectedValuesLabel}</label>
						</div>
						<FontAwesomeIcon icon={faSortDown} />
					</div>
					{this.getDropdownPart()}
				</div>
			</React.Fragment>
		)
	}
};

const mapDispatchToProps = dispatch => {
	return {
		addDropdownState: (id) => dispatch(dropdownActions.addDropdownState(id)),
		removeDropdownState: (id) => dispatch(dropdownActions.removeDropdownState(id)),
		addItems: (id, items) => dispatch(dropdownActions.addItemsToDropdownState(id, items)),
		logItems: (id) => dispatch(dropdownActions.logStoredItems(id))
	}
}

DropDown.propTypes = {
	dropdownName: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]).isRequired,
		name: PropTypes.string.isRequired
	})).isRequired
};

/* ++++++++++ --------------- EXPORTS --------------- ++++++++++ */
export default connect(null, mapDispatchToProps)(onClickOutside(DropDown));

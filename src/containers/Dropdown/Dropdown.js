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

		let currentIcon;
		switch (Pluralize.singular(props.dropdownName)) {
			case 'Country':
				currentIcon = faGlobe;
				break;
			case 'Device':
				currentIcon = faTabletAlt;
				break;
			case 'Site':
				currentIcon = faLink;
				break;
			default:
				currentIcon = faList;
		}

		this.state = {
			dropdownId: _uniqueId('dropdownUID-'),
			options: props.options,
			icon: currentIcon,
			dropdownName: Pluralize.singular(props.dropdownName),
			dropdownPluralName: Pluralize(props.dropdownName),
			selectedValuesLabel: 'All ' + Pluralize(props.dropdownName),
			isOpened: false,
			isFilterActive: false,
			isFiltered: false,
			searchWord: null,
		}

		props.addDropdownState(this.state.dropdownId);
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
		const items = this.getAllCheckedOptions();
		this.props.addItems(this.state.dropdownId, items);

		const updatedSelectedValuesLabel = this.getSelectedValuesLabel();
		this.setState({
			isFiltered: true,
			selectedValuesLabel: updatedSelectedValuesLabel
		})
	}

	updateOptionsState = (updatedOptions) => {
		let updatedIsFilterActive = false;
		const option = updatedOptions.find(opt => opt.checked === true);
		if (option) {
			updatedIsFilterActive = true;
		}
		this.setState({
			options: updatedOptions,

			isFilterActive: updatedIsFilterActive
		});
	}

	getSelectedValuesLabel = () => {
		const num = this.state.options.filter(opt => opt.checked).length;
		let selectedLabel = 'All ' + this.state.dropdownPluralName;

		if (num < this.state.options.length && num > 0) {
			const name = num === 1 ? this.state.dropdownName : this.state.dropdownPluralName;
			selectedLabel = num.toString() + ' ' + name + ' selected';
		}
		return selectedLabel;
	}

	getAvalibleOptions = () => {
		if (this.state.searchWord && this.state.searchWord !== "") {

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

	getAllCheckedOptions() {
		return this.state.options.filter(opt => opt.checked);
	}

	getUpdatedOptionsChecked = (checkState) => {
		return this.state.options.map(opt => {
			return {
				...opt,
				checked: checkState
			}
		});
	}

	componentWillUnmount = () => {
		this.props.removeDropdownState(this.state.dropdownId);
	}
	

	render() {
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

		const dropdownMainClasses = [classes.DropdownMain];
		if (this.state.isOpened) {
			dropdownMainClasses.push(classes.DropdownMainActive);
		}

		const dropdownLabelSelected = [classes.LabelSelected];
		if (this.state.isFiltered) {
			dropdownLabelSelected.push(classes.LabelSelectedFiltered);
		}

		return (
			<React.Fragment>
				<div className={classes.DropdownWrapper}>
					<div className={dropdownMainClasses.join(' ')} onClick={this.toggleList}>
						<div>
							<FontAwesomeIcon
								icon={this.state.icon}
								size="lg"
								style={{
									color: 'rgb(200,200,200)',
								}} />
						</div>
						<div>
							<label className={classes.LabelMain}>{this.state.dropdownPluralName}</label>
							<label className={dropdownLabelSelected.join(' ')}>{this.state.selectedValuesLabel}</label>
						</div>
						<div>
							<FontAwesomeIcon icon={faSortDown} />
						</div>
					</div>
					{dropPart}
				</div>
			</React.Fragment>
		)
	}


};

const mapDispatchToProps = dispatch => {
	return {
		addDropdownState: (id) => dispatch(dropdownActions.addDropdownState(id)),
		removeDropdownState: (id) => dispatch(dropdownActions.removeDropdownState(id)),
		addItems: (id, items) => dispatch(dropdownActions.addItemsToDropdownState(id, items))
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

/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// libraries
// actions
import * as actionTypes from '../actions/actionTypes'

/* ========== ~~~~~~~~~~ DROPDOWN STATUS : REDUCER ~~~~~~~~~~ ========== */
// DEFAULT STATE
const defaultState = {
    // please fill this in
    dropdownList: []
};

const addDropsownState = (state, action) => {
    if (action.dropdownId) {
        const updatedDropdownList = [...state.dropdownList]
        updatedDropdownList.push({
            dropdownId: action.dropdownId,
            checkedItems: []
        });
        const updatedState = {
            ...state,
            dropdownList: updatedDropdownList
        };
        return updatedState;
    }
    return state;
}


const removeDropdownState = (state, action) => {
    console.log('state');
    if (action.dropdownId) {
        const updatedDropdownList = state.dropdownList.filter(d => d.dropdownId !== action.dropdownId);
        return {
            ...state,
            dropdownList: updatedDropdownList
        };
    }
    return state;
}

const addItemsToDropsownState = (state, action) => {
    const updatedDropdownList = state.dropdownList.map(d => d.dropdownId === action.dropdownId ? { dropdownId: action.dropdownId, checkedItems: action.ItemsList } : d);
    const updatedState = {
        ...state,
        dropdownList: updatedDropdownList
    };
    console.log('-------------------------------------------------------------------------');
    console.log('-----All state-----');
    console.log(updatedState);
    console.log('-----Current Dropdown Sate-----');
    console.log(updatedDropdownList.find(d => d.dropdownId === action.dropdownId).checkedItems);
    return {
        ...state,
        dropdownList: [...updatedDropdownList]
    }
}

// REDUCER
export const dropdownStatus = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_DROPDOWN_STATE:
            return addDropsownState(state, action);
        case actionTypes.ADD_ITEMS_TO_DROPDOWN:

            return addItemsToDropsownState(state, action);
        case actionTypes.REMOVE_DROPDOWN_STATE:
            return removeDropdownState(state, action);
        default:
            return state;
    }
};

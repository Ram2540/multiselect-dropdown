/* ++++++++++ --------------- EXPORTS --------------- ++++++++++ */
import * as actionTypes from './actionTypes';

export const addDropdownState = (id) => ({
    type: actionTypes.ADD_DROPDOWN_STATE,
    dropdownId: id
});

export const removeDropdownState = (id) => ({
    type: actionTypes.REMOVE_DROPDOWN_STATE,
    dropdownId: id
});

export const addItemsToDropdownState = (id, items) => (
    {
        type: actionTypes.ADD_ITEMS_TO_DROPDOWN,
        dropdownId: id,
        ItemsList: items
    }
);

export const logStoredItems = (id) => (
    {
        type: actionTypes.LOG_STORED_ITEMS,
        dropdownId: id
    }
);






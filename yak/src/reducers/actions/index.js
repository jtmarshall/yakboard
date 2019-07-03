import { UPDATE_FILTER, UPDATE_FACILITY } from "./types";

export const UPDATE_USER = 'users:updateUser';

export function updateUser(newUser) {
    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    }
}

export const updateFilter = ({ filterObj }) => ({
    type: UPDATE_FILTER,
    payload: {
        Filter: filterObj,
    }
});

export const updateFacility = (facilityObj) => (
    console.log(facilityObj),
    {
    type: UPDATE_FACILITY,
    payload: {
        SelectedFacility: facilityObj.facility,
        SelectedFacilityDomain: facilityObj.domain,
    }
});
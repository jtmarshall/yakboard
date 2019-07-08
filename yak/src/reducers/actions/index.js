import {UPDATE_FILTER, UPDATE_FACILITY, UPDATE_DATEFRAME} from "./types";

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

export const updateFacility = (facilityObj) => ({
    type: UPDATE_FACILITY,
    payload: {
        SelectedFacility: facilityObj.Facility,
        SelectedFacilityDomain: facilityObj.Domain,
    }
});

export const updateDateFrame = (dateObj) => ({
    type: UPDATE_DATEFRAME,
    payload: {
        From: dateObj.From,
        To: dateObj.To,
        CompareFrom: dateObj.CompareFrom,
        CompareTo: dateObj.CompareTo
    },
});
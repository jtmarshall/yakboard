import { UPDATE_FILTER } from "./types";

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
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        suggestedUsers: [],
        userProfile: null,  // for profile
        selectedUser: null,  // for selecting chat user
        refreshProfilePage : true
    },

    reducers: {
        setAuthuser: (state, action) => {
            state.user = action.payload;
        },
        setSuggestedUsers: (state, action) => {
            state.suggestedUsers = action.payload
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;  
        },
        setRefreshProfilePage: (state) => {
            state.refreshProfilePage = !state.refreshProfilePage
        }
    }
});

export const {
    setAuthuser,
    setSuggestedUsers,
    setUserProfile,
    setSelectedUser,
    setRefreshProfilePage
} = authSlice.actions; 

export default authSlice.reducer;
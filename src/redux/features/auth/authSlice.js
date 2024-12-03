import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    name: name? name : "",
    user: {
        name : "",
        phone: "",
        email: "",
        bio: "",
        photo: "",
    }

}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action){
        state.isLogin  = action.payload
    },
    SET_NAME(state, action){
        state.name = action.payload
    },
    SET_USER(state, action){
        const profile = action.payload
        state.user.name = profile.name
        state.user.phone = profile.phone
        state.user.email = profile.email
        state.user.bio = profile.bio
        state.user.photo = profile.photo
    }
  }
});

export const {SET_LOGIN, SET_NAME, SET_USER} = authSlice.actions

export const selectIsloggedIn = (state)=>state.auth.isLogin
export const selectName = (state)=>state.auth.name
export const selectUser = (state)=>state.auth.user

export default authSlice.reducer
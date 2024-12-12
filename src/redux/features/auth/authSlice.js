import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

// Safely parse name from localStorage
const getSavedName = () => {
    try {
        const savedName = localStorage.getItem('name')
        return savedName ? JSON.parse(savedName) : ""
    } catch (error) {
        console.error("Name has not parsed yet! localStorage:", error)
        toast.error(error)
        return ""
    }
}
    

const initialState = {
    isLoggedIn: false,
    name: getSavedName(),
    user : {
        name: "",
        email: "",
        bio: "",
        photo: ""
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_LOGIN: (state, action) =>{
            state.isLoggedIn = action.payload

        },
        SET_NAME: (state, action)=>{
            localStorage.setItem('name', JSON.stringify(action.payload))
            state.name = action.payload
        },

        SET_USER: (state, action)=>{
            const profile = action.payload
            state.user.name = profile.name
            state.user.email = profile.email
            state.user.bio = profile.bio
            state.user.photo = profile.photo
        }
    }
})



export const selectIsloggIn = (state) => state.auth.isLoggedIn
export const selectName = (state) => state.auth.name
export const selectUser = (state) => state.auth.user

export const {SET_LOGIN, SET_NAME, SET_USER} = authSlice.actions

export default authSlice.reducer
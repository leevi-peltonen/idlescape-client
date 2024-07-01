import { createAsyncThunk } from "@reduxjs/toolkit"
//import api from "../../services/api"
import { getUserData, loginUser, logoutUser } from "../../services/api"
import { setCredentials, clearCredentials } from "./authSlice"
import { notifications } from "@mantine/notifications"
import { setUserData } from "../user/userSlice"


export const loginUserAsync = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { username: string, password: string }, { dispatch }) => {
        const response = await loginUser(credentials)
        const { access_token } = response.data

        localStorage.setItem('token', access_token)

        const userResponse = await getUserData()

        if(!response.data.access_token || !userResponse.data) {
            notifications.show({
                title: 'Failed to log in',
                message: response.data.message,
                color: 'red',
                withCloseButton: true
            
            })
            localStorage.removeItem('token')
            throw new Error('Failed to log in')
        }


        notifications.show({
            title: 'Logged in successfully',
            message: `Welcome back, ${userResponse.data.username}!`,
            color: 'lime',
            withCloseButton: true
        })
        

        dispatch(setCredentials({ accessToken: access_token }))
        dispatch(setUserData(userResponse.data))
    }
)

export const logoutUserAsync = createAsyncThunk('auth/logoutUser', async (credentials: {username: string, token: string}, { dispatch }) => {
    const response = await logoutUser(credentials.username, credentials.token)

    localStorage.removeItem('token')
    dispatch(clearCredentials())
    dispatch(setUserData(null))
    notifications.show({
        title: 'Logged out',
        message: 'You have been logged out',
        color: 'cyan',
        withCloseButton: true
    })
    
})
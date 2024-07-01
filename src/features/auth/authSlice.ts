import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    isAuthenticated: boolean
    accessToken: string | null
    //userData: UserData | null
}

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    accessToken: localStorage.getItem('token'),
    //userData: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<{ accessToken: string }>) {
            if(!action.payload.accessToken) {
                state.isAuthenticated = false
                state.accessToken = null
                return
            }
            state.isAuthenticated = true
            state.accessToken = action.payload.accessToken
        },
        clearCredentials(state) {
            state.isAuthenticated = false
            state.accessToken = null
        }
    }
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer
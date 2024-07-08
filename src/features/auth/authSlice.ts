import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginUser } from '../../services/api'

interface AuthState {
    isAuthenticated: boolean
    accessToken: string | null
}

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    accessToken: localStorage.getItem('token'),
}

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string, password: string }) => {
        const response = await loginUser(credentials)
        if(response.data.access_token) {
            localStorage.setItem('token', response.data.access_token)
        }
        return response.data
    }
)

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
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.isAuthenticated = true
            state.accessToken = action.payload
        }),
        builder.addCase(loginAsync.rejected, (state) => {
            state.isAuthenticated = false
            state.accessToken = null
        })
    }
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer
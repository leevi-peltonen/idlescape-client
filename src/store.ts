import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import userReducer from "./features/user/userSlice"
import actionReducer from "./features/action/actionSlice"
import playerReducer from "./features/player/playerSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        action: actionReducer,
        player: playerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
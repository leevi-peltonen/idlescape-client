import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import userReducer from "./features/user/userSlice"
import actionReducer from "./features/action/actionSlice"
import gameReducer from "./features/game/gameSlice"
import craftingReducer from "./features/crafting/craftingSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        action: actionReducer,
        game: gameReducer,
        crafting: craftingReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
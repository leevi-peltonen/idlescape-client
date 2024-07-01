import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item } from '../../interfaces/item'
import { Resource } from '../../interfaces/resource'

interface ActionState {
    isActive: boolean
    actionName: string
    actionDuration: number
    skillId: number | null
    items: Item[] | null
    resource: Resource | null
}

const initialState: ActionState = {
    isActive: false,
    actionName: '',
    actionDuration: 0,
    skillId: null,
    items: null,
    resource: null
}

interface StartActionPayload {
    actionName: string
    actionDuration: number
    skillId: number
    items: Item[]
    resource: Resource
}

const actionSlice = createSlice({
    name: 'action',
    initialState,
    reducers: {
        startAction(state, action: PayloadAction<StartActionPayload>) {
            state.isActive = true
            state.actionName = action.payload.actionName
            state.actionDuration = action.payload.actionDuration
            state.skillId = action.payload.skillId
            state.items = action.payload.items
            state.resource = action.payload.resource
        },
        endAction(state) {
            state.isActive = false
            state.actionName = ''
            state.actionDuration = 0
            state.skillId = null
        }
    }
})

export const { startAction, endAction } = actionSlice.actions

export default actionSlice.reducer
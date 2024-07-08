import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Item } from "../../interfaces/item"
import { Skill } from "../../interfaces/skill"
import { calculateLevel } from "../../game/levels"
import { findExistingItemSlot, findFirstEmptySlot } from "../../utilities/utilities"
import { ActionDefinition } from "../../game/actions"

export interface InventoryItem {
    item: Item
    slot: number
    quantity: number
}

export interface EquippedItem {
    item: Item
    slot: number
}

export interface ActionModel {
    actionData: ActionDefinition
    status: 'idle' | 'in-progress'
}

interface GameState {
    game: GameModel | null
    action: ActionModel | null
}

interface Skills {
    [key: string]: Skill
}

export interface GameModel {
    characterName: string
    equippedItems: EquippedItem[]
    inventory: InventoryItem[]
    gold: number
    lastActivity: string
    lastOnline: string
    skills: Skills
}

const initialState: GameState = {
    game: null,
    action: null
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameState(state, action: PayloadAction<GameModel>) {
            state.game = action.payload
        },
        clearGameState(state) {
            state.game = null
        },
        increaseGold(state, action: PayloadAction<number>) {
            if(state.game) {
                state.game.gold += action.payload
            }
        },
        decreaseGold(state, action: PayloadAction<number>) {
            if(state.game) {
                state.game.gold -= action.payload
            }
        },
        startAction(state, action: PayloadAction<ActionDefinition>) {
            state.action = {
                actionData: action.payload,
                status: 'in-progress'
            }
        },
        stopAction(state) {
            state.action = null
        },
        gainXP(state, action: PayloadAction<{skill: string, xp: number}>) {
            if(state.game) {
                state.game.skills[action.payload.skill].xp += action.payload.xp
                state.game.skills[action.payload.skill].level = calculateLevel(state.game.skills[action.payload.skill].xp)
            }
        },
        updateInventory(state, action: PayloadAction<InventoryItem[]>) {
            if(state.game) {
                state.game.inventory = action.payload
            }
        },
        addItemToInventory(state, action: PayloadAction<{item: InventoryItem, existingItemSlot: number|null, firstEmptySlot?: number}>) {
            if(!action.payload.existingItemSlot && action.payload.firstEmptySlot && state.game) {
                state.game.inventory[action.payload.firstEmptySlot] = action.payload.item
            } else if(action.payload.existingItemSlot && state.game) {
                state.game.inventory[action.payload.existingItemSlot].quantity += action.payload.item.quantity
            }
        },
    }
})

export const { 
    setGameState, 
    clearGameState, 
    increaseGold, 
    decreaseGold, 
    startAction, 
    stopAction, 
    gainXP, 
    updateInventory, 
    addItemToInventory
} = gameSlice.actions

export default gameSlice.reducer
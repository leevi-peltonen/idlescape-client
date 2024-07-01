import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InventoryItem, Item } from '../../interfaces/item'
import { addItemToInventory, addXpToSkill, getCharacters, getInventoryItems, sellItem, updateInventoryItemSlot } from '../../services/api'
import { PlayerData, PlayerSkill } from '../../interfaces/player'



interface PlayerState {
    activePlayer: PlayerData | null
    allPlayers: PlayerData[]
    activePlayerInventory: InventoryItem[]
    playerSkills: PlayerSkill[] | null
    //inventoryItems: InventoryItem[]
}

const initialState: PlayerState = {
    activePlayerInventory: [],
    activePlayer: null,
    allPlayers: [],
    playerSkills: null
}

// Async thunk to fetch users players
export const fetchUserPlayers = createAsyncThunk(
    'player/fetchUserPlayers',
    async (userId: number) => {
        const response = await getCharacters(userId)
        return response.data
    }
)

export const addSkillXpAsync = createAsyncThunk(
    'player/addSkillXp',
    async (payload: {skillId: number, xp: number, playerId: number}) => {
        const response = await addXpToSkill(payload.playerId, payload.skillId, payload.xp)
        return response.data
    }

)

export const updateInventoryItemSlotAsync = createAsyncThunk(
    'player/updateInventoryItemSlot',
    async (updatedItems: {inventoryItemId: number, slot: number, inventoryId: number}[]) => {
        const response = await updateInventoryItemSlot(updatedItems)
        return response.data
    }
)

export const sellItemAsync = createAsyncThunk(
    'player/sellItem',
    async (payload: {inventoryItemId: number, quantity: number}) => {
        const response = await sellItem(payload.inventoryItemId, payload.quantity)
        return response.data
    }
)

export const setActivePlayerInventoryAsync = createAsyncThunk(
    'player/setActivePlayerInventory',
    async (inventoryId: number) => {
        const response = await getInventoryItems(inventoryId)
        return response.data
    }

)

export const addItemToInventoryAsync = createAsyncThunk(
    'player/addItemToInventory',
    async (payload: {inventoryId: number, itemId: number, quantity: number}) => {
        const response = await addItemToInventory(payload.inventoryId, payload.itemId, payload.quantity)
        return response.data
    }
)


const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setActivePlayer(state, action: PayloadAction<PlayerData|null>) {
            state.activePlayer = action.payload
        },
        clearActivePlayer(state) {
            state.activePlayer = null
        },
        setAllPlayers(state, action: PayloadAction<PlayerData[]>) {
            state.allPlayers = action.payload
        },
        setActivePlayerSkills(state, action: PayloadAction<PlayerSkill[]>) {
            state.playerSkills = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserPlayers.fulfilled, (state, action) => {
            state.allPlayers = action.payload
        }),
        builder.addCase(updateInventoryItemSlotAsync.fulfilled, (state, action) => {
            state.activePlayerInventory = action.payload
        }),
        builder.addCase(setActivePlayerInventoryAsync.fulfilled, (state, action) => {
            state.activePlayerInventory = action.payload
        }),
        builder.addCase(sellItemAsync.fulfilled, (state, action) => {
            state.activePlayerInventory = action.payload.inventory
            if(state.activePlayer) {
                state.activePlayer.gold = action.payload.gold
            }
        }),
        builder.addCase(addItemToInventoryAsync.fulfilled, (state, action) => {
            state.activePlayerInventory = action.payload
        }),
        builder.addCase(addSkillXpAsync.fulfilled, (state, action) => {
            state.playerSkills = action.payload
        })
    }
})

export const { setActivePlayer, clearActivePlayer, setAllPlayers, setActivePlayerSkills } = playerSlice.actions

export default playerSlice.reducer
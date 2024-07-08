import axios, { AxiosResponse } from 'axios'
import { GameModel } from '../features/game/gameSlice';

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  }); 

// export const getUserData = (): Promise<AxiosResponse<User>> => api.get('/auth/me')
// export const loginUser = (credentials: { username: string, password: string } ) => api.post('/auth/login', credentials)
// export const registerUser = (credentials: { username: string, password: string }) => api.post('/auth/register', credentials)
// export const logoutUser = (username: string, token: string) => api.post('/auth/logout', { username }, { headers: { Authorization: `Bearer ${token}` } })
// export const initializeResources = (token: string) => api.get('/resource/init', { headers: { Authorization: `Bearer ${token}` } })
// export const initializeSkills = () => api.get('/skill/init')
// export const initializeItems = () => api.get('/item/init')
// export const getSkills = () => api.get('/skill')
// export const addMoney = (username: string, amount: number) => api.post('/user/coins', { username, coins: amount })
// export const getResources = () => api.get('/resource')
// export const getResourcesBySkill = (skillId: number) => api.get(`/resource/skill/${skillId}`)
// export const createCharacter = (name: string, userId: number) => api.post('/character', { characterName: name, userId })
// export const getCharacters = (userId: number): Promise<AxiosResponse<PlayerData[]>> => api.get(`/character/${userId}`)
// export const getPlayerItems = (characterId: number) => api.get(`/character/${characterId}/items`)
// export const getAllItems = () => api.get('/item')
// export const addItemToInventory = (inventoryId: number, itemId: number, quantity: number):Promise<AxiosResponse<InventoryItem[]>> => api.post('/inventory-item', { inventoryId, itemId, quantity })
// export const getInventoryItems = (inventoryId: number): Promise<AxiosResponse<InventoryItem[]>> => api.get(`/inventory-item/${inventoryId}`)
// export const updateInventoryItemSlot = (updatedSlots: {inventoryItemId: number, slot: number, inventoryId: number}[]): Promise<AxiosResponse<InventoryItem[]>> => api.post(`/inventory-item/update-slots/`, updatedSlots )
// export const sellItem = (inventoryItemId: number, quantity: number): Promise<AxiosResponse<{inventory: InventoryItem[], gold: number}>> => api.post('/inventory-item/sell', { inventoryItemId, quantity })
// export const destroyItem = (inventoryItemId: number) => api.delete(`/inventory-item/${inventoryItemId}`)
// export const getCharacterItems = (characterId: number): Promise<AxiosResponse<InventoryItem[]>> => api.get(`/character/items/${characterId}`)
// export const createItem = (name: string, description: string, type: ItemType, value: number, stackable: boolean) => api.post('/item', { name, description, type, value, stackable })
// export const connectItemsToResource = (resourceId: number, itemIds: number[]) => api.post('/resource-items', { resourceId, itemIds })
// export const addXpToSkill = (characterId: number, skillId: number, xp: number) => api.post('/player-skills/add-experience', { playerId: characterId, skillId, xp })


export const registerUser = async (username: string, password: string) => api.post('/auth/register', { username, password })
export const loginUser = async (credentials: {username: string, password: string}) => api.post('/auth/login', credentials)
export const loadGameState = async (characterName: string) => api.get(`/game-state/${characterName}`)
export const saveGameState = async (gameState: GameModel) => api.post(`/game-state`, { gameState })

export const createCharacter = async (characterName: string) => api.post('/user/character/create', {characterName})
export const getUserCharacters = async () => api.get('/user/characters')

export default api
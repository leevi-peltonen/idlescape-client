import { InventoryItem, Item } from "./item"

export interface PlayerData {
    id: number
    lastOnline: string | null
    lastActivity: number | null
    characterName: string
    level: number
    gold: number
    equippedItems: Item[] | null
    inventory: {id: number, size: number, items: InventoryItem[]}
    skills: PlayerSkill[]
}

export interface PlayerSkill {
    id: number
    level: number
    experience: number
    skill: {id: number, name: string}
}
import { Item } from "./item"

export interface Resource {
    name: string
    gatherAmount: number
    gatherTime: number
    tier: number
    skillId: number
    experience: number
    items: Item[]
    levelRequirement: number
}
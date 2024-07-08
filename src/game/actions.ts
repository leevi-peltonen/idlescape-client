import { Item, ItemType } from "../interfaces/item"
import { SkillEnum } from "./skills"

export interface DropTableUnit {
    item: Item
    amount: number
    chance: number
}


/**
 *  - name: string
 *  - xp: number,
 *  - dropTable: DropTableUnit[],
 *  - duration: number,
 *  - skill: string
 */
export interface ActionDefinition {

    /**
     * Unique identifier
     */
    name: string

    /**
     * The human-readable name of the action
     */
    label: string

    /**
     * The amount of experience the player gains when performing this action
     */
    xp: number

    /**
     * drop table for the action
     */
    dropTable: DropTableUnit[]


    /**
     * The duration of the action in seconds
     */
    duration: number

    /**
     * The skill that this action is associated with
     */
    skill: string

    /**
     * The level required to perform the action
     */
    levelRequirement: number
}


export const DEV_DROP_TABLE: DropTableUnit[] = [
    {
        item: {
            name: 'metal_scrap',
            label: 'Metal Scrap',
            type: ItemType.Material,
            description: 'A piece of metal scrap that can be used to craft various items',
            value: 1,
            stackable: true
        },
        amount: 1,
        chance: 0.5
    }
]

/**
 * A list of all the actions that the player can perform in the game
 */
export const actionDefinitions: ActionDefinition[] = [
    {
        name: 'salvage_debris_field',
        label: 'Salvage Debris Field',
        xp: 5,
        dropTable: DEV_DROP_TABLE,
        duration: 7.5,
        skill: SkillEnum.SalvageOperations,
        levelRequirement: 1
    },
    {
        name: 'salvage_shipwreck',
        label: 'Salvage Shipwreck',
        xp: 15,
        dropTable: DEV_DROP_TABLE,
        duration: 8,
        skill: SkillEnum.SalvageOperations,
        levelRequirement: 5
    },
    {
        name: 'salvage_alien_technology',
        label: 'Alien Technology Center',
        xp: 200,
        dropTable: DEV_DROP_TABLE,
        duration: 60,
        skill: SkillEnum.SalvageOperations,
        levelRequirement: 10
    },
    {
        name: 'salvage_derelict_vessel',
        label: 'Derelict Vessel',
        xp: 150,
        dropTable: DEV_DROP_TABLE,
        duration: 100,
        skill: SkillEnum.SalvageOperations,
        levelRequirement: 15
    },

    {
        name: 'mine_asteroid',
        label: 'Asteroid',
        xp: 100,
        dropTable: DEV_DROP_TABLE,
        duration: 50,
        skill: SkillEnum.AsteroidMining,
        levelRequirement: 1
    }


]
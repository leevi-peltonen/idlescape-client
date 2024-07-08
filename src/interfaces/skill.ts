import { SkillPassiveEffect } from "./gameEffect"



export enum SkillCategory {
    COMBAT = 'Combat',
    GATHERING = 'Gathering',
    CRAFTING = 'Crafting',
    SUPPORT = 'Support'
}

export interface Skill {
    _id: string
    name: string
    level: number
    xp: number
    category: SkillCategory
    /**
     * The maximum amount of skill points that can be allocated to this skill. This can be increased by various means
     */
    maxSkillPoints: number

    /**
     * The amount of skill points that can be allocated to this skill currently
     */
    availableSkillPoints: number

    unlockedPassives: SkillPassiveEffect[]
}
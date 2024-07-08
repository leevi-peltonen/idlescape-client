import { SkillEnum } from "../game/skills"


export interface SkillPassiveModifiers {
    durationModifier?: number
    qualityModifier?: number
    quantityModifier?: number
    sellPriceModifier?: number
    buyPriceModifier?: number
    xpModifier?: number
}


export interface SkillPassiveEffect {    
    name: string
    description: string
    effectDescription: string
    modifiers: SkillPassiveModifiers
    skillPointCost: number
    levelRequirement: number
    skill: SkillEnum
}
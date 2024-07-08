import { SkillEnum } from "../game/skills";
import { SkillPassiveEffect } from "../interfaces/gameEffect";

export const SkillPassiveEffects: SkillPassiveEffect[] = [
    {
        name: 'Debris Scavenger',
        description: 'Enhance the ability to gather materials from space debris fields.',
        effectDescription: 'Increases the amount of basic resources collected during scavenging by 10%.',
        modifiers: {
            quantityModifier: 0.1
        },
        skillPointCost: 1,
        levelRequirement: 1,
        skill: SkillEnum.SalvageOperations
    },
    {
        name: "Advanced Scanning",
        description: "Utilize sophisticated scanning technology to locate valuable salvage items.",
        effectDescription: "Unlocks the ability to find rare and exotic materials.",
        modifiers: {},
        skillPointCost: 2,
        levelRequirement: 5,
        skill: SkillEnum.SalvageOperations
    },
    {
        name: "Salvage Efficiency",
        description: "Speed up the process of breaking down large objects into usable components.",
        effectDescription: "Reduces the time required to salvage materials by 25%.",
        modifiers: {
            durationModifier: -0.25
        },
        skillPointCost: 5,
        levelRequirement: 25,
        skill: SkillEnum.SalvageOperations
    },
    {
        name: "Alien Technology Specialist",
        description: "Specialize in the recovery of alien technology.",
        effectDescription: "Increases the chance of finding alien technology by 10-50%.",
        modifiers: {},
        skillPointCost: 4,
        levelRequirement: 15,
        skill: SkillEnum.SalvageOperations
    }
]
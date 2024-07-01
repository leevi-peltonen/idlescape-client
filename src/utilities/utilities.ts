import { PlayerSkill } from "../interfaces/player";


export const getSkillData = (skills: PlayerSkill[] | null, skillName: string): PlayerSkill => {
    if(!skills) {
        return { id: 0, level: 1, experience: 0, skill: { id: 0, name: skillName } }
    }
    const skill = skills.find(skill => skill.skill.name === skillName)
    if(skill) {
        return skill
    }
    return { id: 0, level: 1, experience: 0, skill: { id: 0, name: skillName } } 
}
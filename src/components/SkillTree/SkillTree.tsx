import { SimpleGrid } from "@mantine/core"

import SkillTreeNode from "./SkillTreeNode"
import { SkillPassiveEffect } from "../../interfaces/gameEffect"
import { useAppSelector } from "../../hooks/useRedux"
import { SkillEnum } from "../../game/skills"

interface SkillTreeProps {
    effects: SkillPassiveEffect[]
    skill: SkillEnum
}

const SkillTree = ({ effects, skill }: SkillTreeProps) => {

    const playerSkillData = useAppSelector(state => state.game.game?.skills[skill])

    if(!playerSkillData) return null

    return (
        <SimpleGrid cols={4}>
            {effects.map((effect, index) => {
                return (
                    <SkillTreeNode
                        effect={effect}
                        key={index}
                        unlocked={playerSkillData?.level >= effect.levelRequirement}
                    />
                )
            })}
        </SimpleGrid>
    )
}

export default SkillTree
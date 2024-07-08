import { Card, Image, Group, Text, Badge, Divider } from "@mantine/core"
import { Skill } from "../../interfaces/skill"
import { SkillPassiveEffect } from "../../interfaces/gameEffect"

interface SkillTreeNodeProps {
    effect: SkillPassiveEffect
    unlocked?: boolean
}

const SkillTreeNode = ({ effect, unlocked }: SkillTreeNodeProps) => {
    return (
        <Card 
            shadow="sm" 
            padding="lg" 
            radius="md" 
            
            bg="rgb(52, 53, 74)"
            style={{width: '250px', color: unlocked ? 'white' :'gray', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative'}}
        >
            

                <Text fw={800}>{effect.name}</Text>
                { !unlocked && <Text fw={400}>Unlock Cost: {effect.skillPointCost}</Text>}
                <Badge style={{ position: "absolute", top: 5, right: 5}} color={unlocked ? 'blue' : 'red'}>{unlocked ? 'unlocked' : 'locked'}</Badge>
            
            <Card.Section p="md">
                <Divider />
                <Text fw={400}>{effect.description}</Text>
                <Divider />
                <Text fw={500} fs="italic" >{effect.effectDescription}</Text>
            </Card.Section>

        </Card>
    )

}

export default SkillTreeNode
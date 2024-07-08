import { Box, SimpleGrid, Text } from "@mantine/core";
import { ActionDefinition, actionDefinitions } from "../../../game/actions";
import { SkillEnum } from "../../../game/skills";
import { useEffect, useState } from "react";
import ActionNode from "../../../components/ActionNode/ActionNode";


const AsteroidMiningPage = () => {

    
    const [actionData, setActionData] = useState<ActionDefinition[]>([])

    useEffect(() => {
        const actions = actionDefinitions.filter((action) => action.skill === SkillEnum.AsteroidMining) as ActionDefinition[]
        setActionData(actions)
    
    }, [])

    return (
        <div>
            <SimpleGrid cols={4}>
                {actionData.map((action, index) => {
                    return (
                        <ActionNode
                            action={action}
                            key={index}
                        />
                    )
                })}
            </SimpleGrid>
            
        </div>
    );
}

export default AsteroidMiningPage;
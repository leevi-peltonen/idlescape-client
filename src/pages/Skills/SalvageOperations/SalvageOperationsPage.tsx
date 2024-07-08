import { Accordion, Box, Button, Modal, SimpleGrid, Text, Collapse, Group, Tabs, rem } from "@mantine/core";
import { ActionDefinition, actionDefinitions } from "../../../game/actions";
import { SkillEnum } from "../../../game/skills";
import { useEffect, useState } from "react";
import ActionNode from "../../../components/ActionNode/ActionNode";
import { useAppSelector } from "../../../hooks/useRedux";
import SkillTree from "../../../components/SkillTree/SkillTree";
import { Skill } from "../../../interfaces/skill";
import { SkillPassiveEffects } from "../../../data/skill";
import { GiPowerLightning, GiSkills, GiInfo} from "react-icons/gi";

const skill = SkillEnum.SalvageOperations

const SalvageOperationsPage = () => {
    const iconStyle = { width: rem(20), height: rem(20) };
    const skillData = useAppSelector(state => state.game.game?.skills[skill]) as Skill
    const [actionData, setActionData] = useState<ActionDefinition[]>([])
    
    useEffect(() => {
        const actions = actionDefinitions
            .filter((action) => 
                (action.skill === skill)
        ) as ActionDefinition[]
        
        
        setActionData(actions)
    }, [skillData?.level])


    return (
        <Box
            
            className="content-container"
        >

            <Tabs>
                <Tabs.List c="white" mb="md">
                    <Tabs.Tab value="overview" leftSection={<GiInfo style={iconStyle} />}>
                        Overview
                    </Tabs.Tab>
                    <Tabs.Tab value="actions" leftSection={<GiPowerLightning style={iconStyle} />}>
                        Actions
                    </Tabs.Tab>
                    <Tabs.Tab value="passives" leftSection={<GiSkills style={iconStyle} />}>
                        Passives
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="overview" c="white">
                    <Box 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        border: '1px solid #333'
                    }}>
                        <Text>Salvage Operations</Text>
                        <Text>Level: {skillData?.level}</Text>
                        <Text>XP: {skillData?.xp}</Text>
                    </Box>

                </Tabs.Panel>

                <Tabs.Panel value="actions">
                    <SimpleGrid cols={4}>
                        {actionData.map((action, index) => {
                            if(action.levelRequirement > (skillData?.level || 1000)) {
                                return (
                                    <ActionNode
                                        action={action}
                                        key={index}
                                        isLocked
                                    />
                                )
                            }
                            return (
                                <ActionNode
                                    action={action}
                                    key={index}
                                />
                            )
                        })}
                    </SimpleGrid>
                </Tabs.Panel>

                <Tabs.Panel value="passives">
                    <SkillTree 
                        effects={SkillPassiveEffects.filter(ef => ef.skill === SkillEnum.SalvageOperations)} 
                        skill={SkillEnum.SalvageOperations}
                    />
                </Tabs.Panel>

            </Tabs>
                        
            
        </Box>
    );
}

export default SalvageOperationsPage;
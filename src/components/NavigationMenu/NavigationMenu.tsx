import { Box, NavLink } from "@mantine/core"
import { Link, useLocation } from "react-router-dom"
import NavigationTab from "../NavigationTab/NavigationTab"
import { SKILL_ID_MAP } from "../../data/skill"
import { getSkillData } from "../../utilities/utilities"
import { useAppSelector } from "../../hooks/useRedux"

import './NavigationMenu.css'

interface Tab {
    label: string
    path: string
}
interface NavigationMenuProps {
    tabs: Tab[]
}

interface SkillIdMap {
    [key: string]: number;
}

const NavigationMenu = ({ tabs }: NavigationMenuProps) => {
    
    const { playerSkills } = useAppSelector(state => state.player)

    return (
        <Box
            className="hidden-scrollbar"
        >
            {tabs.map((tab, index) => {
                if(!tab.label) {
                    
                    return <div key={index} style={{height: 1, backgroundColor: 'white', margin: 10}} />
                }
                
                if((SKILL_ID_MAP as SkillIdMap)[tab.label]) {
                    const skillData = getSkillData(playerSkills, tab.label)
                    return (
                        <NavigationTab
                            path={tab.path}
                            label={tab.label}
                            key={tab.path}
                            playerSkill={skillData}
                        />
                    )
                }

                return (
                    <NavigationTab
                        path={tab.path}
                        label={tab.label}
                        key={tab.path}
                        playerSkill={null}
                    />
                )
            })}
        </Box>
    )
}

export default NavigationMenu
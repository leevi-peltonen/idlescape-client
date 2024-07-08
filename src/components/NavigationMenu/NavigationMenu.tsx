import { Box, NavLink } from "@mantine/core"
import { Link, useLocation } from "react-router-dom"
import NavigationTab from "../NavigationTab/NavigationTab"
import { useAppSelector } from "../../hooks/useRedux"

import './NavigationMenu.css'
import { Skill } from "../../interfaces/skill"

interface Tab {
    label: string
    path: string
    skill?: Skill
}
interface NavigationMenuProps {
    tabs: Tab[]
}

interface SkillIdMap {
    [key: string]: number;
}

const NavigationMenu = ({ tabs }: NavigationMenuProps) => {
    
    //const { playerSkills } = useAppSelector(state => state.player)

    return (
        <Box
            className="hidden-scrollbar"
        >
            {tabs.map((tab, index) => {
                if(!tab.label) {
                    
                    return <div key={index} style={{height: 3, margin: 10}}/>
                }
                
                if(tab.skill) {
                    //const skillData = getSkillData(playerSkills, tab.label)
                    return (
                        <NavigationTab
                            path={tab.path}
                            label={tab.label}
                            key={tab.path}
                            playerSkill={tab.skill}
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
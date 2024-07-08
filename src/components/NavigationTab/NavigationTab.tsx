import { Box, NavLink, Paper, Progress, ThemeIcon, rem, Text, Group, Badge } from "@mantine/core"
import { useEffect, useState } from "react"
import { Skill } from "../../interfaces/skill"
import { Link, useLocation } from "react-router-dom"
import { useAppSelector } from "../../hooks/useRedux"
import { experienceForLevel } from "../../game/levels"
import { GrTest } from "react-icons/gr"
interface NavigationTabProps {
    playerSkill: Skill | null
    path: string
    label: string

}

const levelStyle = {
    fontStyle: 'italic',
    color: 'gray',
    margin: '0 8px'
}
const NavigationTab = ({playerSkill, path, label}: NavigationTabProps) => {
    const { game } = useAppSelector(state => state.game)
    const [progress, setProgress] = useState(0)

    const location = useLocation()

    useEffect(() => {
        if(!playerSkill) return
        const currentLevelXp = experienceForLevel(playerSkill.level)
        const nextLevelXp = experienceForLevel(playerSkill.level + 1)

        const xpProgress = playerSkill.xp - currentLevelXp

        const xpBetweenLevels = nextLevelXp - currentLevelXp

        const progressPercentage = (xpProgress / xpBetweenLevels) * 100
        // Find progress, when xp and next level are cumulative
        setProgress(progressPercentage)
        //setProgress(playerSkill.xp / getNextLevelExperience(playerSkill.level) * 100)
    }, [game?.skills, playerSkill])

    useEffect(() => {
        console.log(`${path} should equal ${location.pathname}`)

    },[path])


    return (
        <Box
            style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: "1px solid #333", padding: 8, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.2)'}}
        >
            <NavLink 
                component={Link} 
                key={path} 
                to={path} 
                label={
                    <>
                        {label} {playerSkill && (
                            <span style={levelStyle}>
                                <b style={{color:'white'}}>{playerSkill.level}</b> / 99
                            </span>
                        )}
                    </>
                } 
                active={location.pathname === path}
                variant="filled"
            />

            {playerSkill && location.pathname !== path && (
                <Progress value={progress} />   
            )}

        </Box>
    )
}

export default NavigationTab
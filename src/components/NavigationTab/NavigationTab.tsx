import { Box, NavLink, Progress } from "@mantine/core"
import { useEffect, useState } from "react"
import { PlayerSkill } from "../../interfaces/player"
import { Link, useLocation } from "react-router-dom"

interface NavigationTabProps {
    playerSkill: PlayerSkill | null
    path: string
    label: string

}

const levelStyle = {
    fontStyle: 'italic',
    color: 'gray',
    margin: '0 8px'
}
const NavigationTab = ({playerSkill, path, label}: NavigationTabProps) => {

    const [progress, setProgress] = useState(0)

    const location = useLocation()

    useEffect(() => {
        if(playerSkill) {
            
        }
    }, [playerSkill])

    return (
        <Box
            style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
        >
            <NavLink 
                component={Link} 
                key={path} 
                to={path} 
                //label={`${label} ${playerSkill ? playerSkill.level + "/99" : ''}`}
                label={
                    <>
                        {label} {playerSkill && (
                            <span style={levelStyle}>
                                <b style={{color: 'white'}}>{playerSkill.level}</b> / 99
                            </span>
                        )}
                    </>
                } 
                active={location.pathname === path}
                variant="filled"
            />
            {playerSkill && (
            <Progress 
                value={progress}
                transitionDuration={1}
                color="blue"

            />)}
        </Box>
    )
}

export default NavigationTab
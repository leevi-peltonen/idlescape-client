import { Badge, Card, Group, Paper, Progress, Text, ThemeIcon, rem } from "@mantine/core"
import { ActionDefinition } from "../../game/actions"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import { startAction, stopAction } from "../../features/game/gameSlice"
import { useEffect, useState } from "react"
import { GrTest  } from "react-icons/gr";
import { GiStoneBlock } from "react-icons/gi";
import { FaQuestionCircle } from "react-icons/fa";

import './ActionNode.css'
interface ActionNodeProps {
    action: ActionDefinition
    isLocked?: boolean
}

const ActionNode = ({action, isLocked}: ActionNodeProps) => {
    const [active, setActive] = useState(false)
    const dispatch = useAppDispatch()
    const game = useAppSelector(state => state.game)
    const handleAction = () => {
        // If the action is already in progress AND the action is the same as the one clicked, stop the action
        if(game.action?.status === 'in-progress' && game.action?.actionData.name === action.name) {
            dispatch(stopAction())
        } else {
            dispatch(startAction(action))
        }
    }

    useEffect(() => {
        if(game.action?.actionData.name === action.name) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [game.action?.actionData.name])

    if(isLocked) {
        return <LockedNode />
    }

    // return (
    //     <Card
    //         onClick={handleAction}
    //         shadow={active ? "xl" : "xs"}
    //         padding="md"
    //         radius="md"
    //         style={{cursor: 'pointer', backgroundColor: active ? 'lightgreen' : "#8D99AE", display:'flex', alignItems:'center', justifyContent: "center", width: "250px", height: "150px"}}
            
    //     >
            
    //         <Text size="lg"><b>{action.label}</b></Text>
            
    //         <Text size="sm">{action.duration}s</Text>
    //     </Card>
    // )

    return (
        <Paper radius="md" withBorder className="card" mt={20} onClick={handleAction}>
          <ThemeIcon className="icon" size={60} radius={60}>
            <GiStoneBlock style={{ width: rem(32), height: rem(32) }} />
          </ThemeIcon>
    
          <Text ta="center" fw={700} className="title">
            {action.label}
          </Text>
          <Text c="dimmed" ta="center" fz="sm">
            {action.duration} seconds
          </Text>
    

    
          
    
          
            <Badge mt="lg" color={active ? 'blue' : 'black'} size="lg">{active ? "Active" : "Inactive"}</Badge>
          
        </Paper>
      );
}

const LockedNode = () => {
    return (
        <Paper radius="md" withBorder className="card" mt={20}>
          <ThemeIcon className="icon" size={60} radius={60}> 
            <FaQuestionCircle style={{ width: rem(32), height: rem(32) }} />
          </ThemeIcon>
    
          <Text ta="center" fw={700} className="title">
            ????
          </Text>
          <Text c="dimmed" ta="center" fz="sm">
            ??
          </Text>
    

    
          
    
          
            <Badge mt="lg" size="lg">Locked</Badge>
          
        </Paper>
    )
}


export default ActionNode
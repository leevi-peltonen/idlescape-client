import { RootState } from "../../store"
import { Text, Progress, Box, Card, Image, Group, Badge, Button, ActionIcon } from "@mantine/core"
import { useState, useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import { ActionDefinition, actionDefinitions } from "../../game/actions"
import { gainXP, stopAction } from "../../features/game/gameSlice"
import { GiStoneBlock } from "react-icons/gi"
import './ActionBox.css'

const ActionBox = () => {

    const { action } = useAppSelector((state: RootState) => state.game)
    const [progress, setProgress] = useState(0)
    const intervalRef = useRef<number | null>(null)
    const dispatch = useAppDispatch()

    const handleActionSuccess = () => {
        if(action) {
            dispatch(gainXP({skill: action.actionData.skill, xp: action.actionData.xp}))
        }
    }

    const skillData = useAppSelector(state => state.game.game?.skills[action?.actionData.skill as string])

    

    useEffect(() => {

        if (action?.status === 'in-progress') {
            let startTime = Date.now();
            intervalRef.current = window.setInterval(() => {
                const elapsedTime = (Date.now() - startTime) / 1000; // convert to seconds
                const progressPercentage = (elapsedTime / action.actionData.duration) * 100;
                setProgress(progressPercentage);
                if (progressPercentage >= 100) {
                    handleActionSuccess()
                    setProgress(0);
                    startTime = Date.now();
                }
            }, 10);
        } else {
            setProgress(0);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
      }, [action?.status, action?.actionData.duration]);



    if(!action) {
        return (
            <Text> No action in progress </Text>
        )
    }


    return (
        <>

        {action.status === 'in-progress' ?
            <Box>
                <Card withBorder radius="md" p="md" className='badge'>
                    <Card.Section className="section" mt="md">
                        
                        <Text fz="lg" fw={500}>
                            {action.actionData.label}
                        </Text>

                       
                        <Badge size="sm" variant="light">
                            {action.actionData.duration} seconds
                        </Badge>
                    </Card.Section>
                
                    <Card.Section className="section">
                        <Text mt="md" className="label" c="dimmed">
                            
                        </Text>
                        <Group gap={7} mt={5}>
                            <Badge variant="light">
                                {skillData?.name}
                            </Badge>
                            <Badge variant="light">
                                {skillData?.category} Skill
                            </Badge>

                        </Group>
                    </Card.Section>
                    <Progress value={progress} transitionDuration={1}/>
                    <Group mt="xs">
                        <Button radius="md" style={{ flex: 1 }} onClick={() => dispatch(stopAction())}>
                            Stop Action
                        </Button>
                    </Group>
                </Card>
                
                
            </Box> :
            <Text> No Action In Progress </Text>
        }   
        </>
    )
}



export default ActionBox
import { notifications } from "@mantine/notifications"
import { Resource } from "../../interfaces/resource"
import { Card, Text } from '@mantine/core'
import { useEffect, useState } from "react"


interface ResourceNodeProps {
    skillLevel: number
    skill: string
    resource: Resource
    onAction: () => void
    active: boolean
}




const ResourceNode = ({skill, resource, onAction, active, skillLevel}: ResourceNodeProps) => {

    const [isLocked, setIsLocked] = useState(true)

    const handleAction = () => {

        if(skillLevel < resource.levelRequirement) {
            notifications.show({message: "You need to level up your skill to gather this resource", color: 'red'})
            return
        }

        onAction()
    }

    useEffect(() => {
        if(skillLevel >= resource.levelRequirement) {
            setIsLocked(false)
        }
    
    }, [skillLevel, resource.levelRequirement])
    
    if(isLocked) {
        return (
            <Card
                onClick={handleAction}
                shadow="xs"
                padding="md"
                radius="md"
                style={{ backgroundColor: 'grey', display:'flex', alignItems:'center', border: '1px solid red'}}
            >
                
                <Text size="lg"><b>{resource.name}</b></Text>
                <Text size="sm">Level {resource.levelRequirement}</Text>
                <Text size="sm">{resource.gatherTime}s</Text>
            </Card>
        )
    }


    return (
        <Card
            onClick={handleAction}
            shadow="xs"
            padding="md"
            radius="md"
            style={{cursor: 'pointer', backgroundColor: active ? 'lightgreen' : "#8D99AE", display:'flex', alignItems:'center'}}
            
        >
            
            <Text size="lg"><b>{resource.name}</b></Text>
            <Text size="sm">Level {resource.levelRequirement}</Text>
            <Text size="sm">{resource.gatherTime}s</Text>
        </Card>
    )
}

export default ResourceNode
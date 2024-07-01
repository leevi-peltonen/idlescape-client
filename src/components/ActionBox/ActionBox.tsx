import { RootState } from "../../store"
import { Text, Progress, Box } from "@mantine/core"
import { useState, useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import { addItemToInventoryAsync, addSkillXpAsync } from "../../features/player/playerSlice"


const ActionBox = () => {

    const { isActive, actionName, actionDuration, items, resource, skillId } = useAppSelector((state: RootState) => state.action)
    const { activePlayer } = useAppSelector((state: RootState) => state.player)
    const [progress, setProgress] = useState(0)
    const intervalRef = useRef<number | null>(null)
    const dispatch = useAppDispatch()
    const handleActionSuccess = () => {
        if (!activePlayer || !activePlayer.inventory || !resource || !items || !skillId) {
            return
        }
        items?.forEach(async (item) => {
            dispatch(addItemToInventoryAsync({inventoryId: activePlayer.inventory.id, itemId: item.id, quantity: 1}))
            dispatch(addSkillXpAsync({skillId: skillId, xp: resource.experience, playerId: activePlayer.id}))
            toast.success(`+1 ${item.name}, +${resource.experience} XP`)
        })

    }
    

    useEffect(() => {

        if (isActive) {
            let startTime = Date.now();
            intervalRef.current = window.setInterval(() => {
                const elapsedTime = (Date.now() - startTime) / 1000; // convert to seconds
                const progressPercentage = (elapsedTime / actionDuration) * 100;
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
      }, [isActive, actionDuration]);

    if (!isActive) {
        return (
            <Text> No action in progress </Text>
        )
    }

    return (
        <Box>
            <Progress value={progress} transitionDuration={1}/>
            <Text>{actionName}</Text>
        </Box>
        
    )
}

export default ActionBox
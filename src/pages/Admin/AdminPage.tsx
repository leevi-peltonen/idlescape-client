import { Box, Button } from "@mantine/core"
import { decreaseGold, gainXP, increaseGold, startAction, stopAction } from "../../features/game/gameSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import useAction from "../../hooks/useAction"
import { actionDefinitions } from "../../game/actions"
import { SkillEnum } from "../../game/skills"


const AdminPage = () => {

    const dispatch = useAppDispatch()
    const {action} = useAppSelector(state => state.game)
    const { performAction } = useAction()

    const xp_payload = {
        skill: SkillEnum.AsteroidMining,
        xp: 50
    }

    const handleAction = () => {

        if(action?.status === 'in-progress') {
            dispatch(stopAction())
        } else if(action?.status === 'idle') {
            dispatch(startAction(actionDefinitions[0]))
        }
        else {
            dispatch(startAction(actionDefinitions[0]))
        }
    }

    return (

        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}
        >
            <Button onClick={() => dispatch(increaseGold(100))}>Add Money</Button>
            <Button onClick={() => dispatch(decreaseGold(100))}>Remove Money</Button>
            <Button onClick={() => dispatch(gainXP(xp_payload))}>Add XP</Button>
            
            <Button onClick={handleAction}>Loop action test</Button>

            
        </Box>
    )
}

export default AdminPage
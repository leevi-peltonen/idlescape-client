import { Button } from "@mantine/core"
import { saveGameState } from "../../services/api"
import { useAppSelector } from "../../hooks/useRedux"
import toast from "react-hot-toast"


const SaveButton = () => {
    const { game } = useAppSelector(state => state.game)
    const handleSaveGame = async () => {
        if (!game) return
        
        const response = await saveGameState(game)
        if(response.status === 201) {
            toast.success('Game saved!')
        } else {
            toast.error('Failed to save game!')
        }
    }
    return (
        <Button variant="filled" onClick={handleSaveGame}>Save Game</Button>
    )
}

export default SaveButton
import { useEffect, useState } from "react"
//import { getCharacters } from "../../services/api"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { Box, Button } from "@mantine/core"
import CardContainer from "../../components/CardContainer/CardContainer"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks/useRedux"
import { getUserCharacters } from "../../services/api"
import { GameModel, setGameState } from "../../features/game/gameSlice"

const CharacterSelectionPage = () => {

    const [gameStates, setGameStates] = useState<any[]>([])
    //const { userData } = useSelector((state: RootState) => state.user)

    

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const handleGetCharacters = async () => {
            const res = await getUserCharacters()
            setGameStates(res.data)
            console.log(res.data)
        }

        handleGetCharacters()
        
    }, [])


    const handleSelectCharacter = (character: GameModel) => {
        

        dispatch(setGameState(character))

        navigate('/bank')
    }

    // if(characters.length === 0) {
    //     return (
    //         <Box>
    //             <h1>No characters found</h1>
    //         </Box>
    //     )
    // }

    return (
        <div>
            <h1>Character Selection</h1>
            {
                gameStates.map((character) => (
                    <CardContainer key={character._id} mt="lg">
                        <h2>{character.characterName}</h2>
                        <Button onClick={() => handleSelectCharacter(character)} >Select Character</Button>
                    </CardContainer>
                ))
            }
        </div>
    )
}

export default CharacterSelectionPage
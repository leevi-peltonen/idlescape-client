import { useEffect, useState } from "react"
import { getCharacters } from "../../services/api"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { Box, Button } from "@mantine/core"
import { fetchUserPlayers, setActivePlayer, setActivePlayerInventoryAsync, setActivePlayerSkills } from "../../features/player/playerSlice"
import CardContainer from "../../components/CardContainer/CardContainer"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks/useRedux"
import { PlayerData } from "../../interfaces/player"

const CharacterSelectionPage = () => {

    //const [characters, setCharacters] = useState<PlayerData[]>([])
    const { userData } = useSelector((state: RootState) => state.user)

    const characters = useSelector((state: RootState) => state.player.allPlayers)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const handleGetCharacters = async (userId: number) => {
            // const response = await getCharacters(userId)
            // setCharacters(response.data)

            dispatch(fetchUserPlayers(userId))
        }

        if(userData) {
            handleGetCharacters(userData.id)
        }
    }, [userData])


    const handleSelectCharacter = (character: PlayerData) => {
        console.log(character)
        dispatch(setActivePlayer(character))
        dispatch(setActivePlayerInventoryAsync(character.inventory.id))
        dispatch(setActivePlayerSkills(character.skills))
        navigate('/bank')
    }

    if(characters.length === 0) {
        return (
            <Box>
                <h1>No characters found</h1>
            </Box>
        )
    }

    return (
        <div>
            <h1>Character Selection</h1>
            {
                characters.map((character: PlayerData) => (
                    <CardContainer key={character.id} mt="lg">
                        <h2>{character.characterName}</h2>
                        <Button onClick={() => handleSelectCharacter(character)} >Select Character</Button>
                    </CardContainer>
                ))
            }
        </div>
    )
}

export default CharacterSelectionPage
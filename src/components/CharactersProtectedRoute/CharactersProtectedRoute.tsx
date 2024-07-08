
import { useAppSelector } from "../../hooks/useRedux"
import { RootState } from "../../store"
import { Navigate, Outlet } from "react-router-dom"


const CharactersProtectedRoute = () => {
    
    const gameState = useAppSelector((state: RootState) => state.game)
    
    return gameState.game ? <Outlet /> : <Navigate to="/select" />
}

export default CharactersProtectedRoute
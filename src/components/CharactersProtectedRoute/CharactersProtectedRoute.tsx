
import { useAppSelector } from "../../hooks/useRedux"
import { RootState } from "../../store"
import { Navigate, Outlet } from "react-router-dom"


const CharactersProtectedRoute = () => {
    const userData = useAppSelector((state: RootState) => state.user.userData)
    const player = useAppSelector((state: RootState) => state.player)
    
    return userData && player.activePlayer !== null ? <Outlet /> : <Navigate to="/select" />
}

export default CharactersProtectedRoute
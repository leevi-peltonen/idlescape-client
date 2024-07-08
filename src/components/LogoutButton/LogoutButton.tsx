import { Button } from "@mantine/core"
import { useAppDispatch } from "../../hooks/useRedux"
import { clearCredentials } from "../../features/auth/authSlice"

const LogoutButton = () => {

    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(clearCredentials())
        localStorage.removeItem('token')
    }


    return (
        <Button onClick={handleLogout} variant="filled" color="red">
            Logout
        </Button>
    )
}

export default LogoutButton
import { Button } from "@mantine/core"
import { logoutUserAsync } from "../../features/auth/authThunks"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { notifications } from "@mantine/notifications"

const LogoutButton = () => {

    const dispatch = useDispatch<AppDispatch>()

    const userData = useSelector((state: RootState) => state.auth.userData)
    const token = useSelector((state: RootState) => state.auth.accessToken)
    const handleLogout = () => {
        dispatch(logoutUserAsync({ username: userData?.username || '', token: token || ''}))
    }

    return (
        <Button onClick={handleLogout} variant="filled" color="red">
            Logout
        </Button>
    )
}

export default LogoutButton
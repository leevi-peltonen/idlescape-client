import { useForm } from "@mantine/form"
import { Button, Group, TextInput } from "@mantine/core"
import { loginUserAsync } from "../../features/auth/authThunks"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import CardContainer from "../../components/CardContainer/CardContainer"

const LoginPage = () => {

    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        }
    })

    const dispatch = useDispatch<AppDispatch>()

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    const navigate = useNavigate()

    const handleLogin = () => {
        const username = form.values.username
        const password = form.values.password

        dispatch(loginUserAsync({ username, password }))

        
    }

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/bank')
        }
    }, [isAuthenticated])

    return (
        <CardContainer>
            <form
                onSubmit={form.onSubmit(handleLogin)}
            >
                <TextInput
                    label="Username"
                    placeholder="Enter your username"
                    required
                    value={form.values.username}
                    onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                    autoComplete="username"
                />
                <TextInput
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    required
                    value={form.values.password}
                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                    autoComplete="current-password"
                />

                <Group mt="md">
                    <Button type="submit">Log in</Button>
                </Group>
            </form>
        </CardContainer>
    )
}

export default LoginPage
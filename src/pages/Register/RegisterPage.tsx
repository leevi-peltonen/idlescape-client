import { useForm } from "@mantine/form"
import { Button, Group, TextInput } from "@mantine/core"
import { registerUser } from "../../services/api"
import CardContainer from "../../components/CardContainer/CardContainer"
import { notifications } from "@mantine/notifications"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        }
    })

    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            const res = await registerUser(form.values)

            if(res.data.access_token) {
                navigate('/login')
                notifications.show({
                    title: 'Registered succesfully!',
                    message: 'You have been registered',
                    color: 'lime',
                    withCloseButton: true
                })
            } else {
                notifications.show({
                    title: 'Registration failed',
                    message: res.data.message,
                    color: 'red',
                    withCloseButton: true
                })
            }
            
        }
        catch (error: any) {
            notifications.show({
                title: 'Registration failed',
                message: error.message,
                color: 'red',
                withCloseButton: true
            
            })
        }
    }

    return (
        <CardContainer>
            <form
                onSubmit={form.onSubmit(handleRegister)}
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
                    autoComplete="new-password"
                />

                <Group mt="md">
                    <Button type="submit">Register</Button>
                </Group>
            </form>
        </CardContainer>
    )
}

export default RegisterPage
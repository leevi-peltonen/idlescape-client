import { Paper, Text, TextInput, Button } from "@mantine/core"
import { Form, useForm } from "@mantine/form"


const ChangePasswordForm = () => {
    const form = useForm()
    return (
        <Paper 
            shadow="xs"
            radius="md"
            p="lg"
            style={{width: '400px'}}
        >
            <Text>Change Password</Text>
            <Form form={form}>
                <TextInput label="Old Password" required type="password" />
                <TextInput label="New Password" required type="password" />
                <TextInput label="Confirm New Password" required type="password" />
                <Button type="submit">Change Password</Button>
            </Form>
        </Paper>
    )
}

export default ChangePasswordForm
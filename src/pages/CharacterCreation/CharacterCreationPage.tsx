import { Button, TextInput } from "@mantine/core"
import { Form, useForm } from "@mantine/form"
import { useState } from "react"
import { createCharacter } from "../../services/api"
import { useSelector } from "react-redux"
import { RootState } from "../../store"


const CharacterCreationPage = () => {

    const { userData } = useSelector((state: RootState) => state.user)

    const form = useForm({
        initialValues: {
            characterName: ''
        }
    })

    const handleCreateCharacter = async () => {
        const response = await createCharacter(form.values.characterName, userData?.id || 0)
        if(response.status === 201) {
            // Redirect to character page
        }
        else {
            // Show error message
        }
    }
    

    return (
        <Form
            form={form}
            onSubmit={handleCreateCharacter}
        >
            <TextInput
                label="Character Name"
                placeholder="Enter your character name"
                required
                key={form.key('characterName')}
                {...form.getInputProps('characterName')}
            />
            <Button type="submit">Create Character</Button>
        </Form>
    )
}

export default CharacterCreationPage
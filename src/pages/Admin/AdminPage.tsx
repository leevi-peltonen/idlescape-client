import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Button, Grid } from "@mantine/core"
import { addMoney, connectItemsToResource, createItem, initializeItems, initializeResources, initializeSkills } from "../../services/api"
import { notifications } from "@mantine/notifications"
import EntityForm from "../../components/EntityForm/EntityForm"
import { Item, ItemType } from "../../interfaces/item"

const AdminPage = () => {

    
    const userData = useSelector((state: RootState) => state.user.userData)
    const token = useSelector((state: RootState) => state.auth.accessToken)


    if (!userData || !token
    ) {
        return <p>Error getting user data</p>
    }

    if(userData.username !== 'Stetu') {
        return <p>You are not authorized to view this page</p>
    }
    
    const handleInitializeResources = async () => {
        const response = await initializeResources(token)
        notifications.show({
            title: response.data.message,
            message: '',
        })
    }

    const handleInitializeSkills = async () => {
        const response = await initializeSkills()
        notifications.show({
            title: response.data.message,
            message: '',
        })
    }

    const handleInitializeItems = async () => {
        const response = await initializeItems()
        notifications.show({
            title: response.data.message,
            message: '',
        })
    }

    const initialItem: Item = {
        id: 0,
        levelRequirement: 0,
        name: '',
        value: 0,
        description: '',
        type: ItemType.Weapon,
        stackable: false,
    }

    const resourceItemsEntity = {
        resourceId: 0,
        itemIds: ''
    }

    const handleCreateItem = async (values: Record<string, any>) => {
    
        const item: Item = {
            id: 0,
            levelRequirement: values.levelRequirement,
            name: values.name,
            value: values.value,
            description: values.description,
            type: values.type,
            stackable: values.stackable,
        }
        await createItem(item.name, item.description, item.type, item.value, item.stackable)
    }

    const handleConnectItemsToResource = async (values: Record<string, any>) => {

        const resourceId: number = values.resourceId
        const itemIds: number[] = values.itemIds.split(',').map((id: string) => parseInt(id))

        const response = await connectItemsToResource(resourceId, itemIds)
        console.log(response.data)
    }

    return (

        <>
            <Grid>
                <Grid.Col span={5}>
                    <Button
                        onClick={handleInitializeResources}
                    >
                        Initialize Resources
                    </Button>
                </Grid.Col>
                <Grid.Col span={5}>
                    <Button onClick={handleInitializeSkills}>
                        Initialize Skills
                    </Button>
                </Grid.Col>
                <Grid.Col span={5}>
                    <Button onClick={handleInitializeItems}>
                        Initialize Items
                    </Button>
                </Grid.Col>
            </Grid>

            <EntityForm title="Create Item" entity={initialItem} onSubmit={(values) => handleCreateItem(values)} />

            <EntityForm title="Connect Items To Resource" entity={resourceItemsEntity} onSubmit={(values) => handleConnectItemsToResource(values)} />
        </>
    )
}

export default AdminPage
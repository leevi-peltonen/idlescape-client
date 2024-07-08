import { Button, Table } from "@mantine/core"
import { useEffect, useState } from "react"
import { Item } from "../../interfaces/item"
//import { getAllItems } from "../../services/api"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
//import { addItemToInventoryAsync } from "../../features/player/playerSlice"
import { useAppDispatch } from "../../hooks/useRedux"

const ShopMenu = () => {

    const [items, setItems] = useState<Item[]>([])

    //const { activePlayer } = useSelector((state: RootState) => state.player)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const handleGetItems = async () => {
            //const response = await getAllItems()
            //setItems(response.data)
        }

        handleGetItems()
    }, [])


    const handleBuyItem = (name: string) => {
        // if(!activePlayer) {
        //     return
        // }
        // if(!activePlayer.inventory) {
        //     return
        // }
        
       // dispatch(addItemToInventoryAsync({inventoryId: activePlayer.inventory.id, itemId, quantity: 1}))
    }


    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th>Actions</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {items.map((item) => (
                    <Table.Tr key={item.name}>
                        <Table.Td>{item.label}</Table.Td>
                        <Table.Td>{item.value}</Table.Td>
                        <Table.Td>
                            <Button onClick={() => handleBuyItem(item.name)}>Buy</Button>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    )
}

export default ShopMenu
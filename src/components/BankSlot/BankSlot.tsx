import { useDrag, useDrop } from "react-dnd"
import { Box, Button, Menu, Modal, NumberInput, Text } from "@mantine/core"
import { InventoryItem, Item } from "../../interfaces/item"
import { useState } from "react"
import { useAppDispatch } from "../../hooks/useRedux"
import { sellItemAsync } from "../../features/player/playerSlice"
import { useDisclosure } from "@mantine/hooks"
import './BankSlot.css'

interface BankSlotProps {
    id: number
    item: Item | null | undefined
    inventoryItem: InventoryItem | null | undefined
    onDropItem: (draggedId:number, droppedId: number) => void
    itemLogo: React.ReactNode
}

const BankSlot = ({id, item, inventoryItem, onDropItem, itemLogo}: BankSlotProps) => {

    const [opened, { open, close }] = useDisclosure()
    const [openActionMenu, setOpenActionMenu] = useState(false)
    const [quantityToSell, setQuantityToSell] = useState(1)
    const dispatch = useAppDispatch()

    const [{isOver}, drop] = useDrop({
        accept: 'ITEM',
        drop: (draggedItem: { id: number }) => onDropItem(draggedItem.id, id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })

    const [{isDragging}, drag] = useDrag({
        type: 'ITEM',
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })

    const handleOpenMenu = () => {
        setOpenActionMenu(!open)
    }

    const sell = async () => {
        if(!inventoryItem) {
            return
        }
        dispatch(sellItemAsync({inventoryItemId: inventoryItem.id, quantity: quantityToSell}))
        close()
    }

    const destroy = (inventoryItem: InventoryItem) => {
        console.log('Destroying item', inventoryItem)
    }


    return (
        <Box
            ref={drop}
            style={{
                width: 100,
                height: 100,
                border: '1px solid gray',
                borderRadius: '5px',
                borderColor: isOver ? 'blue' : 'gray',
                opacity: isDragging ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: "relative",
                color: 'white',
            }}
        >
            {/* Action Menu */}
            {item && inventoryItem &&
            <Menu shadow="lg" width={200} opened={openActionMenu} onChange={setOpenActionMenu} withArrow>
                <Menu.Target>
                    <Box 
                        ref={drag}
                        onClick={handleOpenMenu}
                    >

                        {itemLogo}

                        <Text>{item.name} {inventoryItem.quantity}</Text>
                        
                        
                    </Box>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={open}>Sell</Menu.Item>
                    <Menu.Item color="red" onClick={() => destroy(inventoryItem)}>Destroy</Menu.Item>
                </Menu.Dropdown>
               
            </Menu>}

            {/* Sell Modal */}
            {item && inventoryItem &&

            
            <Modal
                opened={opened}
                onClose={close}
                title="Quantity to sell"
                centered
                xOffset={0}
            >
                
              <NumberInput
                label="Quantity"
                placeholder="Enter quantity"
                min={1}
                max={inventoryItem.quantity}
                defaultValue={1}
                onChange={(value) => setQuantityToSell(+value)}
                />
                <Box
                    style={{display: 'flex', justifyContent: 'space-between'}}
                >
                <Button
                    onClick={sell}
                >Sell</Button>
                <Button
                    onClick={close}
                >Cancel</Button>
                </Box>

            </Modal>}

        </Box>
    )
}

export default BankSlot

import BankSlot from "../../components/BankSlot/BankSlot"
import { SimpleGrid } from "@mantine/core"
import { useEffect, useState } from "react"
import { InventoryItem, Item } from "../../interfaces/item"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { getCharacterItems, getInventoryItems, updateInventoryItemSlot } from "../../services/api"
import { updateInventoryItemSlotAsync } from "../../features/player/playerSlice"
import useUpdateEffect from "../../hooks/useUpdateEffect"
import { useAppDispatch } from "../../hooks/useRedux"


interface Slot {
    item: Item
    inventoryItem: InventoryItem
}
const getInitialSlots = (items: InventoryItem[]) => {
    const slots = Array(25).fill(null)

    items.forEach((invItem) => {
        slots[invItem.slot] = {
            item: invItem.item,
            inventoryItem: invItem
        }
    })

    return slots
}

const BankPage = () => {
    const { activePlayer, activePlayerInventory } = useSelector((state: RootState) => state.player)
    
    const [slots, setSlots] = useState<(Slot | null)[]>(getInitialSlots(activePlayerInventory || []))

    const dispatch = useAppDispatch()
    
    
    useEffect(() => {
        const updatedSlots = Array(25).fill(null)
        console.log(activePlayerInventory)
        activePlayerInventory.forEach((invItem) => {
            updatedSlots[invItem.slot] = {
                item: invItem.item,
                inventoryItem: invItem
            }
        })

        setSlots(updatedSlots)
    }, [activePlayerInventory])




    const handleDropItem = (draggedId: number, droppedId: number) => {
        

        if(!activePlayer) {
            return
        }

        const updatedSlots = [...slots]
        const draggedItem = slots[draggedId]
        updatedSlots[draggedId] = slots[droppedId]
        updatedSlots[droppedId] = draggedItem

        const updatedItems = updatedSlots.map((slot, index) => {
            if (slot) {
                return {
                    inventoryItemId: slot.inventoryItem.id,
                    slot: index,
                    inventoryId: activePlayer.inventory.id
                }
            }
            return {
                inventoryItemId: 0,
                slot: index,
                inventoryId: activePlayer.inventory.id
            }
        })
        
        dispatch(updateInventoryItemSlotAsync(updatedItems))

       // setSlots(updatedSlots)
    }



    if(!activePlayer) {
        return <p>Error loading inventory</p>
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <SimpleGrid cols={5} spacing="lg">
                    {slots.map((slot, index) => (
                        <BankSlot
                            key={index}
                            id={index}
                            item={slot?.item}
                            inventoryItem={slot?.inventoryItem}
                            onDropItem={handleDropItem}
                            itemLogo={<>Test</>}
                        />
                    ))}
                </SimpleGrid>
            </DndProvider>
        </>
    )
}

export default BankPage
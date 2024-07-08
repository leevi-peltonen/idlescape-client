
import BankSlot from "../../components/BankSlot/BankSlot"
import { SimpleGrid } from "@mantine/core"
import { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import { InventoryItem, updateInventory } from "../../features/game/gameSlice"


const BankPage = () => {
    const inventory = useAppSelector(state => state.game.game?.inventory || [])
    const [slots, setSlots] = useState<InventoryItem[]>(inventory)

    const dispatch = useAppDispatch()
    
    
    useEffect(() => {
        const updatedSlots = Array(25).fill(null)
        
        inventory.forEach((invItem) => {
            updatedSlots[invItem.slot] = {
                item: invItem.item,
                inventoryItem: invItem
            }
        })

        setSlots(updatedSlots)
    }, [inventory])




    const handleDropItem = (draggedId: number, droppedId: number) => {
    
        const updatedSlots = [...slots]
        const draggedItem = slots[draggedId]
        updatedSlots[draggedId] = slots[droppedId]
        updatedSlots[droppedId] = draggedItem

        const updatedItems = updatedSlots.map((slot, index) => {
            if(slot) {
                return {...slot, slot: index}
            }
            return null
        }).filter(item => item !== null) as InventoryItem[]
        
        dispatch(updateInventory(updatedItems))
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
                            inventoryItem={slot}
                            onDropItem={handleDropItem}
                            itemLogo={<></>}
                        />
                    ))}
                </SimpleGrid>
            </DndProvider>
        </>
    )
}

export default BankPage
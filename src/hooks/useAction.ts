import { addItemToInventory, gainXP } from "../features/game/gameSlice"
import { ActionDefinition } from "../game/actions"
import { Item } from "../interfaces/item"
import { findExistingItemSlot, findFirstEmptySlot } from "../utilities/utilities"
import { useAppDispatch, useAppSelector } from "./useRedux"


const useAction = () => {
    const dispatch = useAppDispatch()

    const performAction = (action: ActionDefinition) => {
        
        const temp = [...action.dropTable]
        const sortedDropTable = temp.sort((a, b) => a.chance - b.chance)

        let keepGoing = true
        while(keepGoing) {
            const diceRoll = Math.random()
            
            const item = sortedDropTable.find(drop => drop.chance > diceRoll)

            if(item) {
                keepGoing = false
                // TODO: Add item to inventory
            }
        }
        
        dispatch(gainXP({skill: action.skill, xp: action.xp}))
    }

    return { performAction }
}

export default useAction
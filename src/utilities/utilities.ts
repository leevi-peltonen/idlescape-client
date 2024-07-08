import { InventoryItem } from "../features/game/gameSlice";


/**
 * Finds the first empty slot in the inventory, given the occupied slots and size of 25
 * @param occupiedSlots 
 * @returns 
 */
export const findFirstEmptySlot = (occupiedSlots: number[]): number | null => {
    let allSlots = new Set<number>()
    for (let i = 0; i < 25; i++) {
        allSlots.add(i);
    }

    let usedSlots = new Set(occupiedSlots);
    let emptySlots = new Set([...allSlots].filter(x => !usedSlots.has(x)));

    if (emptySlots.size === 0) {
        return null;
    }
    return Math.min(...emptySlots);
}


export const findExistingItemSlot = (inventory: InventoryItem[], itemName: string) => {
    return inventory.find(item => item.item.name === itemName)?.slot ?? null 
}
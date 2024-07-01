
export enum ItemType {
    Consumable = 'Consumable',
    Weapon = 'Weapon',
    Armor = 'Armor',
    Accessory = 'Accessory',
    Material = 'Material',
}

export interface InventoryItem {
    id: number
    item: Item
    quantity: number
    slot: number
}


export interface Item {

    id: number

    /**
     * The name of the item. This is how the item will be displayed in the game
     */
    name: string

    /**
     * The type of item. This determines how the item can be used and what bonuses it provides
     */
    type: ItemType

    /**
     * A description of the item. This is a brief overview of what the item does
     */
    description: string
    /**
     * The value of the item. This is how much the item can be sold for
     */
    value: number

    /**
     * If multiple items can be stacked in the same inventory slot
     */
    stackable: boolean

    /**
     * The level required to use the item
     */
    levelRequirement: number

    /**
     * The base damage of the item. Only applies to weapons
     */
    baseDamage?: number

    /**
     * The amount of health the item restores when used. Only applies to consumable items
     */
    healingAmount?: number

    /**
     * Gives player more attack power. Higher attack means higher chance to hit
     */
    attackBonus?: number

    /**
     * Increases the player's critical strike chance by this amount. Critical strikes deal increased damage
     */
    criticalChanceBonus?: number

    /**
     * Increases the player's critical strike damage by this amount
     */
    criticalDamageBonus?: number

    /**
     * Increases the player's penetration chance by this amount. Penetration chance increases the chance to bypass enemy armor
     */
    penetrationBonus?: number

    /**
     * Increases the player's dodge chance by this amount. Dodge chance reduces the chance of being hit
     */
    dodgeChanceBonus?: number

    /**
     * Increases the player's health by this amount
     */
    healthBonus?: number

    /**
     *  Increases the player's armor by this amount. Armor reduces the amount of damage taken
     */
    armorBonus?: number
}





/**
 *  Calculate the level of the entity based on the experience
 * @param experience Entity experience
 * @returns Level of the entity based on the experience
 */
export const calculateLevel = (experience: number) => {
    let level = 1
    while (experience >= experienceForLevel(level + 1)) {
        level++
    }
    return level
}


/**
 * Level curve for the game
 * @param level Level to figure out the experience required
 * @returns experience required to reach this level
 */
export const experienceForLevel = (level: number) => {
    return 720 * 2 ** (level / 7) + (1/8)*level*(level-1)-795
}
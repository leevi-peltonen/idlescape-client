import { RiAliensFill } from "react-icons/ri";
import { DEV_DROP_TABLE, DropTableUnit } from "../game/actions";
import { rem } from "@mantine/core";


export interface Enemy {
    avatar: React.ReactNode
    name: string
    level: number
    description: string,
    dropTable: DropTableUnit[]
}

export const DEV_ENEMIES: Enemy[] = [
    {
        avatar: <RiAliensFill style={{ width: rem(30), height: rem(30) }} />,
        name: 'Alien',
        level: 1,
        description: 'A small alien creature',
        dropTable: DEV_DROP_TABLE
    }
]
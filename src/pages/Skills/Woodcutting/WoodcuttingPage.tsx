import { Box, Grid } from "@mantine/core"
import ResourceNode from "../../../components/ResourceNode/ResourceNode"
import { RootState } from "../../../store"
import { endAction, startAction } from "../../../features/action/actionSlice"

import { useEffect, useState } from "react"
import { Resource } from "../../../interfaces/resource"
//import { getResourcesBySkill } from "../../../services/api"
import { Item } from "../../../interfaces/item"
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux"


const WoodcuttingPage = () => {

    const [trees, setTrees] = useState<Resource[]>([])

    const dispatch = useAppDispatch()
    const { isActive, actionName } = useAppSelector((state: RootState) => state.action)
    const { game } = useAppSelector((state: RootState) => state.game)

    const handleAction = (name: string, duration: number, items: Item[], resource: Resource) => {
        if(isActive && actionName === `Cutting ${name}`) {
            dispatch(endAction())
            return
        }
        //dispatch(startAction({ skillId: SKILL_ID_MAP['Woodcutting'], actionName: `Cutting ${name}`, actionDuration: duration, items: items, resource: resource }))
    }



    useEffect(() => {
        const handleGetResources = async () => {
            //const response = await getResourcesBySkill(SKILL_ID_MAP['Woodcutting'])
            //setTrees(response.data)
        }
        handleGetResources()
    }, [])

   

    return (
        <Box>
            <Grid>
                {trees.map((tree) => {
                    return (
                        <Grid.Col span={4} key={tree.name}>
                            <ResourceNode
                                skillLevel={1}
                                skill="Woodcutting"
                                resource={ tree }
                                onAction={() => handleAction(tree.name, tree.gatherTime, tree.items, tree)}
                                active={isActive && `Cutting ${tree.name}` === actionName}
                            />
                        </Grid.Col>


                    )
                })}
            </Grid>
        </Box>
    )
}

export default WoodcuttingPage
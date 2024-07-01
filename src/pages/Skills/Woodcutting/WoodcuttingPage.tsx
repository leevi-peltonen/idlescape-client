import { Box, Grid } from "@mantine/core"
import ResourceNode from "../../../components/ResourceNode/ResourceNode"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../store"
import { endAction, startAction } from "../../../features/action/actionSlice"
import { SKILL_ID_MAP } from "../../../data/skill"
import { useEffect, useState } from "react"
import { Resource } from "../../../interfaces/resource"
import { getResourcesBySkill } from "../../../services/api"
import { Item } from "../../../interfaces/item"
import { getSkillData } from "../../../utilities/utilities"


const WoodcuttingPage = () => {

    const [trees, setTrees] = useState<Resource[]>([])

    const dispatch = useDispatch()
    const { isActive, actionName } = useSelector((state: RootState) => state.action)
    const { playerSkills } = useSelector((state: RootState) => state.player)

    const handleAction = (name: string, duration: number, items: Item[], resource: Resource) => {
        if(isActive && actionName === `Cutting ${name}`) {
            dispatch(endAction())
            return
        }
        dispatch(startAction({ skillId: SKILL_ID_MAP['Woodcutting'], actionName: `Cutting ${name}`, actionDuration: duration, items: items, resource: resource }))
    }



    useEffect(() => {
        const handleGetResources = async () => {
            const response = await getResourcesBySkill(SKILL_ID_MAP['Woodcutting'])
            setTrees(response.data)
        }
        handleGetResources()
    }, [])

    useEffect(() => {
        console.log(playerSkills)
    }, [playerSkills])

    return (
        <Box>
            <Grid>
                {trees.map((tree) => {
                    return (
                        <Grid.Col span={4} key={tree.name}>
                            <ResourceNode
                                skillLevel={playerSkills ? getSkillData(playerSkills, "Woodcutting").level : 1}
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
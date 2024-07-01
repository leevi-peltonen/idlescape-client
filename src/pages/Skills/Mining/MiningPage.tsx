import { useEffect, useState } from "react"
import { SKILL_ID_MAP } from "../../../data/skill"
import { getResourcesBySkill } from "../../../services/api"
import { Resource } from "../../../interfaces/resource"
import { Grid } from "@mantine/core"
import ResourceNode from "../../../components/ResourceNode/ResourceNode"
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux"
import { getSkillData } from "../../../utilities/utilities"
import { Item } from "../../../interfaces/item"
import { endAction, startAction } from "../../../features/action/actionSlice"

const MiningPage = () => {
    const [rocks, setRocks] = useState<Resource[]>([])
    const { isActive, actionName } = useAppSelector(state => state.action)
    const { playerSkills } = useAppSelector(state => state.player)

    const dispatch = useAppDispatch()
    useEffect(() => {
        const getResources = async () => {
            const response = await getResourcesBySkill(SKILL_ID_MAP['Mining'])
            setRocks(response.data)
        }

        getResources()
    })


    const handleAction = (name: string, duration: number, items: Item[], resource: Resource) => {
        if(isActive && actionName === `Cutting ${name}`) {
            dispatch(endAction())
            return
        }
        dispatch(startAction({ skillId: SKILL_ID_MAP['Mining'], actionName: `Mining ${name}`, actionDuration: duration, items: items, resource: resource }))
    }

    return (
        <div>
            <Grid>
                {rocks.map((rock) => {  
                    return (
                        <Grid.Col span={4} key={rock.name}>
                            <ResourceNode
                                skillLevel={playerSkills ? getSkillData(playerSkills, "Mining").level : 1}
                                skill="Mining"
                                resource={ rock }
                                onAction={() => handleAction(rock.name, rock.gatherTime, rock.items, rock)}
                                active={isActive && `Mining ${rock.name}` === actionName}
                            />
                        </Grid.Col>
                    )
                })}
            </Grid>
        </div>
    )
}

export default MiningPage
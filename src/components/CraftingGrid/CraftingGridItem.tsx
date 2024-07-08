import { useDrag, useDrop } from "react-dnd"
import { Box, Text } from "@mantine/core"
import { Item } from "../../interfaces/item"



interface CraftingGridItemProps {
    id: number
    item: Item | null | undefined
    onDropItem: (draggedId:number, droppedId: number) => void
}

const CraftingGridItem = ({id, item, onDropItem}: CraftingGridItemProps) => {

    const [{isOver}, drop] = useDrop({
        accept: 'ITEM',
        drop: (draggedItem: { id: number }) => onDropItem(draggedItem.id, id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })

    const [{isDragging}, drag] = useDrag({
        type: 'ITEM',
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })



    return (
        <Box
            ref={drop}
            style={{
                width: 80,
                height: 80,
                border: '1px solid gray',
                borderRadius: '5px',
                borderColor: isOver ? 'blue' : 'gray',
                opacity: isDragging ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: "relative",
                color: 'white',
            }}
        >
        {   item &&
            <Box ref={drag}>
                <Text>{item.name}</Text>
            </Box>
        }
        </Box>
    )
}

export default CraftingGridItem
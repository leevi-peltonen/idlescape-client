import { SimpleGrid } from "@mantine/core";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CraftingGridItem from "./CraftingGridItem";



const CraftingGrid = () => {
    const slots = Array(16).fill(null);

    return (
        <>
            <DndProvider backend={HTML5Backend}>

                


                <SimpleGrid cols={4} spacing="xs">
                    {slots.map((slot, index) => (
                        <CraftingGridItem
                            key={index}
                            id={index}
                            item={slot}
                            onDropItem={() => {}}
                        />
                    ))}
                </SimpleGrid>
            </DndProvider>
        </>
    );
};

export default CraftingGrid;

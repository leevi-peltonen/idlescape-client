import { HTML5Backend } from "react-dnd-html5-backend";
import CraftingGrid from "../../../components/CraftingGrid/CraftingGrid";

import { ItemType } from "../../../interfaces/item";
import { DndProvider } from "react-dnd";


const CyberEngineeringPage = () => {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                
                <CraftingGrid />
            </DndProvider>
        </div>
    )
}

export default CyberEngineeringPage;
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/useRedux";
import { InventoryItem } from "../../../interfaces/item";
import CardContainer from "../../../components/CardContainer/CardContainer";
import { Button, Text } from "@mantine/core";


const FiremakingPage = () => {
    const [logs, setLogs] = useState<InventoryItem[]>([])
    const { activePlayerInventory } = useAppSelector((state) => state.player)

    const handleBurnLog = (log: InventoryItem) => {
        console.log('Burning log', log)
    }

    useEffect(() => {

        const logs = activePlayerInventory.filter(item => item.item.name.includes('Logs'))
        setLogs(logs)
    }, [activePlayerInventory])

    return (
        <>
            {logs.map(log => {
                return (
                    <CardContainer>
                        <Text>{log.item.name}</Text>
                        <Text>Quantity: {log.quantity}</Text>
                        <Button onClick={() => handleBurnLog(log)}>Burn</Button>
                    </CardContainer>
                )
            })}
        </>
    );
}

export default FiremakingPage
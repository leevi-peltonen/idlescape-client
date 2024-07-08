import { Box, Stack, Text, Group, Paper, ThemeIcon, Grid } from "@mantine/core"
import { DEV_ENEMIES, Enemy } from "../../data/enemy"
import './EnemyList.css'


const EnemyList = () => {

    const handleEnemyClick = (enemy: Enemy) => {
        console.log('Enemy clicked', enemy)
    }

    return (
        <Box className="content-container-small">
            <Grid
                
            >
                {DEV_ENEMIES.map(enemy => {
                    return (
                        <Paper
                            key={enemy.name}
                            p="md"
                            radius="md"
                            withBorder
                            onClick={() => handleEnemyClick(enemy)}
                            className="enemy-card"
                        >
                            <ThemeIcon
                                size="xl"
                                radius="xl"
                                className="enemy-icon"
                            >
                                {enemy.avatar}
                            </ThemeIcon>
                            
                                <Text fw={600}>{enemy.name}</Text>
                                <Text>Level: {enemy.level}</Text>
                                <Text>{enemy.description}</Text>
                            
                        </Paper>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default EnemyList
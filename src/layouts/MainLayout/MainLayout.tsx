import { AppShell, Box, Group, Text } from "@mantine/core";
import NavigationMenu from "../../components/NavigationMenu/NavigationMenu";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { Outlet } from "react-router-dom";
import ActionBox from "../../components/ActionBox/ActionBox";
import { useEffect, useState } from "react";
import { setCredentials } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { authenticatedTabsInitial, noPlayerTabs, unauthenticatedTabs } from "../../data/menu";
import { Skill } from "../../interfaces/skill";
import SaveButton from "../../components/SaveButton/SaveButton";





const MainLayout = () => {
    
    const [authenticatedTabs, setAuthenticatedTabs] = useState(authenticatedTabsInitial([]))
    const { gameState, isAuthenticated } = useAppSelector(state => ({gameState: state.game, isAuthenticated: state.auth.isAuthenticated }))
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) return
        dispatch(setCredentials({accessToken: token}))
    }, [])

    useEffect(() => {
        if(!gameState.game || !isAuthenticated) return
        const skillsArray = Object.values(gameState.game?.skills || {})

        setAuthenticatedTabs(authenticatedTabsInitial(
            skillsArray.map((skill: Skill) => {
                return {
                    label: skill.name,
                    path: skill.name ? `/skills/${skill.name.replace(' ', '')}`: '',
                    skill: skill
                }
            }
        )))
    }, [gameState.game])


    return (
        <AppShell
            header={{height: 60}}
            navbar={{
                width: 200,
                breakpoint: 'sm'
            }}
            padding="md"
            styles={(theme) => ({
                root: {
                    '--app-shell-border-color': 'transparent',
                    backgroundColor: theme.colors.dark[4],
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                },
                header: {
                    backgroundColor: theme.colors.dark[7],
                    color: theme.colors.dark[0],
                    padding: theme.spacing.sm
                },
                navbar: {
                    backgroundColor: theme.colors.dark[6],
                    color: theme.colors.dark[0]
                },
                aside: {
                    backgroundColor: theme.colors.dark[5],
                    color: theme.colors.dark[0],
                    padding: theme.spacing.xl,
                    width: 250
                },
            })}
        >
            <AppShell.Header>
                
                <Group justify="space-between">
                    <Box>
                        <Text size="xl">
                            Idlescape
                        </Text>
                    </Box>
                    <Box>
                        {
                            isAuthenticated && gameState.game && <Text>{gameState.game.characterName}</Text>
                        }
                    </Box>
                    <Box>
                        {
                            isAuthenticated && gameState.game && <Text>Gold: {gameState.game.gold}</Text>
                        }
                    </Box>
                    <Box>
                    {

                        isAuthenticated && 
                        <Box style={{display:'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width:"250px"}}>
                            {gameState.game ? <SaveButton /> : <div></div>}
                            <LogoutButton />
                        </Box>
                    }
                    </Box>

                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md" w="275px">
                <NavigationMenu 
                    tabs={
                        isAuthenticated ? 
                        (gameState.game ? authenticatedTabs : noPlayerTabs)
                        : unauthenticatedTabs
                    }
                />
            </AppShell.Navbar>


            <AppShell.Main style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                
                    <Outlet />
                
                
            </AppShell.Main>
            { isAuthenticated && gameState.game &&
                <AppShell.Aside style={{display: 'flex', justifyContent: 'center'}}>
                    <ActionBox /> 
                </AppShell.Aside>
            }
        </AppShell>
    )
}
export default MainLayout
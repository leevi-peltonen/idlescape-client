import { AppShell, Box, Center, CheckIcon, Group, Text } from "@mantine/core";
import NavigationMenu from "../../components/NavigationMenu/NavigationMenu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { Outlet } from "react-router-dom";
import ActionBox from "../../components/ActionBox/ActionBox";
import { useEffect, useState } from "react";
import { getSkills, getUserData } from "../../services/api";
import { setUserData } from "../../features/user/userSlice";
import { setCredentials } from "../../features/auth/authSlice";





const MainLayout = () => {
    const [skills, setSkills] = useState([])
    const {activePlayer: player, playerSkills} = useSelector((state: RootState) => state.player)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const userData = useSelector((state: RootState) => state.user.userData)
    

    const dispatch = useDispatch()


    useEffect(() => {

        const handleGetSkills = async () => {
            const response = await getSkills()
            
            setSkills(response.data.map((skill: any) => skill.name))
        }

        const handleGetUserData = async () => {
            const response = await getUserData()
            dispatch(setCredentials({accessToken: localStorage.getItem('token') || ''}))
            dispatch(setUserData(response.data))
            console.log(response.data)
        }

        handleGetSkills()

        if(localStorage.getItem('token')) {
            handleGetUserData()
        }

    }, [])

    useEffect(() => {
        console.log('MAIN LAYOUT', playerSkills)
    }, [playerSkills])

    const authenticatedTabs = [
        {
            label: 'Shop',
            path: '/shop'
        },
        {
            label: 'Bank',
            path: '/bank'
        },
        {
            label: '',
            path: ''
        },
        ...skills.map(skill => ({label: skill, path: `/skills/${skill}`})),
        {label: '', path: ''},
        {label: 'Settings', path: '/settings'},
        {label: '', path: ''},
        {label: 'Initialize', path: '/initialize'},
    ]

    const unauthenticatedTabs = [
        {label: 'Home', path: '/'},
        {label: 'Login', path: '/login'},
        {label: 'Register', path: '/register'}
    ]

    const noPlayerTabs = [
        {label: 'Create Character', path: '/create'},
        {label: 'Select Character', path: '/select'}
    ]
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
                            isAuthenticated && player && player.id !== 0 && <Text>{player.characterName}: {player.level}</Text>
                        }
                    </Box>
                    <Box>
                        {
                            isAuthenticated && player && player.id !== 0 && <Text>Gold: {player.gold}</Text>
                        }
                    </Box>
                    <Box>
                    {
                        isAuthenticated && <LogoutButton />
                    }
                    </Box>

                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md" w="275px">
                <NavigationMenu 
                    tabs={
                        isAuthenticated ? 
                        (userData && player && player.id !== 0 ? authenticatedTabs : noPlayerTabs)
                        : unauthenticatedTabs
                    }
                />
            </AppShell.Navbar>


            <AppShell.Main>
                <Center style={{marginTop: 10}}>
                    <Outlet />
                </Center>
                
            </AppShell.Main>
            { isAuthenticated && player && player.id !== 0 &&
                <AppShell.Aside>
                    <ActionBox /> 
                </AppShell.Aside>
            }
        </AppShell>
    )
}
export default MainLayout
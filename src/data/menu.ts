import { Skill } from "../interfaces/skill"


export const authenticatedTabsInitial = (skills: {label: string, path: string, skill: Skill}[]) => [
    {label: 'Shop', path: '/shop'},
    {label: 'Inventory', path: '/bank'},
    {label: 'Combat', path: '/combat'},
    {label: '', path: ''},
    ...skills,
    {label: 'Settings', path: '/settings'},
    {label: 'Change Character', path: '/select'},
    {label: 'DEV PAGE', path: '/initialize'},
]

export const unauthenticatedTabs = [
    {label: 'Home', path: '/'},
    {label: 'Login', path: '/login'},
    {label: 'Register', path: '/register'}
]

export const noPlayerTabs = [
    {label: 'Create Character', path: '/create'},
    {label: 'Select Character', path: '/select'}
]
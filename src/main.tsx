import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import store from './store.ts'



const theme = createTheme({

    colors: {
        dark: 
        [
            '#d5d7e0',
            '#acaebf',
            '#8c8fa3',
            '#666980',
            '#4d4f66',
            '#34354a',
            '#2b2c3d',
            '#1d1e30',
            '#0c0d21',
            '#01010a',
        ],
    },
    primaryColor: 'dark',
    primaryShade: { light: 7, dark: 4 },
})


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <MantineProvider theme={theme}>
            <Notifications />
            <App />
            <Toaster position="bottom-center" />
        </MantineProvider>
    </Provider> 
)

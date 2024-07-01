import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import socket from '../services/socket'
import { notifications } from '@mantine/notifications'

const useSocket = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        socket.connect()

        socket.on('actionSuccess', (success: boolean) => {
            if(!success) {
                notifications.show({
                    title: 'Action failed',
                    message: 'Failed to perform action',
                    color: 'red',
                    withCloseButton: true
                })
            }
        })

        return () => {
            socket.disconnect()
        }
    }, [dispatch])

    const addCoins = (amount: number, username: string) => {
       
    }

    const removeCoins = (amount: number, username: string) => {
       
    }

    const gainXP = (skill: string, amount: number, username: string) => {
        socket.emit('gainXP', { skill, amount, username })
    }

    return { addCoins, removeCoins, gainXP }
}

export default useSocket
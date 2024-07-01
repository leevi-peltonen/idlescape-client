import { io, Socket } from 'socket.io-client';

const URL = 'http://localhost:3000'

const socket: Socket = io(URL, {
    autoConnect: false
})

export default socket
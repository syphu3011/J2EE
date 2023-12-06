import {io} from "socket.io-client"

const sio = io('https://vmtp.id.vn:3301', {
  transports: ['websocket']
})

export default sio;
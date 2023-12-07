import {io} from "socket.io-client"

const sio = io('https://vmtp.id.vn:3301', {
  transports: ['websocket','polling'],
  withCredentials: true,
  secure: true
})

export default sio;
// import React ,{useEffect} from 'react';
// import {Widget,addResponseMessage} from 'react-chat-widget';
// import 'react-chat-widget/lib/styles.css';
// export default function ChatApp(){
//      useEffect(() => {
//           addResponseMessage('Chúng tôi có thể hỗ trợ gì cho bạn!');
//         }, []);
      
//         const handleNewUserMessage = (newMessage) => {
//           console.log(`New message incoming! ${newMessage}`);
//           // Now send the message throught the backend API
//           const response = 'This is a response message'; // Replace with your desired response message
//           addResponseMessage(response);
//           addResponseMessage
//         };
//      return(
//           <div>
//                <Widget className="chatapp" handleNewUserMessage={handleNewUserMessage} title="Welcome to our store" subtitle="Wish you a happy shopping" />
//           </div>
//      )
// }
import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import sio from './socket'; 
// import logo from './bmw-logo.svg';
// import { getData } from './controller';
import { response } from 'express';
function App({isReady=true}) {
  const [isConnected, setIsConnected] = useState(sio.connected);
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    sio.on('error', function()
    {
        console.log("Sorry, there seems to be an issue with the connection!");
    });

    sio.on('connect_error', function(err)
    {
        console.log("connect failed"+err);
    });

    sio.on('connect', function ()
    { 
        console.log("connected");
        sio.on('chat message',function(data)
        {
          if (sio.id != data.id) {
            addResponseMessage(data.msg);
          }
        });
    })
  useEffect(() => {
    
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    if (newMessage) {
      sio.emit('chat message', {msg: newMessage, id: sio.id})
    }
    console.log(`New message incoming! ${newMessage}`);
    // const data = await getData()
    // console.log(data);
    
    // Now send the message throught the backend API
  };

    return (
      <div className="App">
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          
          // profileAvatar={logo}
          title="VMTP Shop xin chào!"
          subtitle="Đây là tin nhắn cộng đồng!"
        />
      </div>
    );
}

export default App;
import React ,{useEffect} from 'react';
import {Widget,addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
export default function ChatApp(){
     useEffect(() => {
          addResponseMessage('Chúng tôi có thể hỗ trợ gì cho bạn!');
        }, []);
      
        const handleNewUserMessage = (newMessage) => {
          console.log(`New message incoming! ${newMessage}`);
          // Now send the message throught the backend API
          const response = 'This is a response message'; // Replace with your desired response message
          addResponseMessage(response);
        };
     return(
          <div>
               <Widget className="chatapp" handleNewUserMessage={handleNewUserMessage} title="Welcome to our store" subtitle="Wish you a happy shopping" />
          </div>
     )
}
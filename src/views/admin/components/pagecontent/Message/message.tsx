import { ChatEngine } from "react-chat-engine";

import ChatFeed from "./ChatFeed";
import "../../../style/chat.css";

export default function message() {
  const projectID = "ad8657c0-1c30-4c4b-a6c3-ba407fcd696b";
  return (
    <ChatEngine
      minHeight="1200px"
      projectID={projectID}
      userName={"admin"}
      userSecret={"123123"}
      
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
}

import { ChatEngine } from "react-chat-engine";

import ChatFeed from "./ChatFeed";
import "../../../style/chat.css";

export default function message() {
  const projectID = "6435ddff-5205-4710-996e-2d114b08aebb";
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

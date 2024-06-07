import { useEffect, useState } from "react";
import config from "../_core/AgoraConfig/config";
import SignalingManager from "../SignalingManager/signalingManager";
import showMessage from "./components/showMessage";

const SignalTest = () => {
  const [signalManager, setManager] = useState<any>();
  const [textMessage, setMessage] = useState<string>("");
  const [channelName, setChannelName] = useState<string>("");
  const [uid, setUid] = useState<string>("");
  const [rtmToken, setRmtToken] = useState<string>("");

  const handleSignalingEvents = (event: any, eventArgs: any) => {
    switch (event) {
      case "message":
        break;
      case "status":
        console.log(
          "Connection state changed to: " +
            eventArgs.state +
            ", Reason: " +
            eventArgs.reason
        );
        break;
    }
  };

  useEffect(() => {
    const fetchManger = async () => {
      const signalingManager = await SignalingManager(
        showMessage,
        handleSignalingEvents,
      );
      console.log("signalingManager --- test" , signalingManager)
      setManager(signalingManager);
    };

    fetchManger();
  }, []);

  const Login = async () => {
    config.channelName = channelName;
    config.rmtUid = uid;
    config.rmtToken = rtmToken;
    await signalManager.login();
    await signalManager.subscribe(config.channelName);
  };

  const Logout = async () => {
    await signalManager.logout();
  };

  const SendMessageToChannel = async () => {
    await signalManager.sendChannelMessage(config.channelName, textMessage);
    setMessage("");
  };

  return (
    <div>
      <h1>Test Signaling</h1>
      <input
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        placeholder="Channel Name"
      />
      {"  "}
      <input
        type="text"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        placeholder="Uid"
      />
      {"  "}
      <input
        type="text"
        value={rtmToken}
        onChange={(e) => setRmtToken(e.target.value)}
        placeholder="token"
      />
      <button onClick={() => void Login()}>Login & Subscribe</button>
      {"  "}
      <button onClick={() => void Logout()}>Logout</button>
      <br />
      <input
        type="text"
        value={textMessage}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="send message"
      />
      {"  "}
      <button onClick={() => void SendMessageToChannel()}>Send message</button>

      <br />
      <hr />
      <blockquote>
        <div id="log"></div>
      </blockquote>
    </div>
  );
};

export default SignalTest;

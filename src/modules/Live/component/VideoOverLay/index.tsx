import { useEffect, useState } from "react";
import ChatBox from "../ChatBox/index";
import EyeIcon from "../EyeIcon/EyeIcon";
import SignalingManager from "src/modules/SignalingManager/signalingManager";
import config from "../../../_core/AgoraConfig/config";
import { getChartObject } from "../../util/helper";

const VideoOverLay = ({ hostName, children }: any) => {
  const [signalManager, setManager] = useState<any>();
  const [chatList, setChatList] = useState<string[]>([]);

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

  const receiveMessage = (message: string) => {
    console.log("Message Bro : ", message);
    setChatList((prevArray) => [...prevArray, message]);
  };

  useEffect(() => {
    const fetchManger = async () => {
      if (typeof window !== "undefined") {
        const signalingManager = await SignalingManager(
          receiveMessage,
          handleSignalingEvents
        );
        setManager(signalingManager);
      }
    };
    fetchManger();
  }, []);

  const loginAndSubscribe = async () => {
    await signalManager.login();
    await signalManager.subscribe(config.channelName);
  };

  useEffect(() => {
    if (signalManager !== undefined) {
      loginAndSubscribe();
    }
  }, [signalManager]);

  return (
    <>
      <div>
        <div style={{ marginLeft: "20px" }}>
          <div style={{ position: "absolute", top: "50px", zIndex: 1 }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                style={{
                  display: "flex",
                  background: "#00000080",
                  borderRadius: "8px",
                  padding: "4px",
                }}
              >
                <img
                  src="https://www.icolorpalette.com/download/solidcolorimage/02ccfe_solid_color_background_icolorpalette.png"
                  width={32}
                  height={32}
                  style={{
                    borderRadius: "50%",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                />
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    marginLeft: "4px",
                    marginRight: "4px",
                    color: "white",
                    marginTop: "auto",
                    marginBottom: "auto",
                    textTransform: "capitalize",
                  }}
                >
                  {hostName}
                </h3>
              </div>
              <button
                style={{
                  background: "#FF3B30",
                  padding: "6px 18px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontWeight: 700,
                  marginTop: "12px",
                  marginBottom: "12px",
                  border: "none",
                  color: "white",
                }}
              >
                Live
              </button>
            </div>
            {/* <div
              style={{
                display: "flex",
                background: "#00000080",
                borderRadius: "8px",
                padding: "4px",
                width: "fit-content",
                marginTop: "8px",
              }}
            >
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 400,
                  marginLeft: "4px",
                  color: "white",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                8 rates
              </h3>
            </div> */}
            <div
              style={{
                display: "flex",
                background: "#00000080",
                borderRadius: "8px",
                padding: "4px",
                width: "fit-content",
                marginTop: "4px",
              }}
            >
              <EyeIcon />
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 400,
                  marginLeft: "4px",
                  color: "white",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                2,232
              </h3>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 20,
              zIndex: 1,
              maxHeight: "40%",
              overflowY: "auto",
            }}
          >
            {chatList?.map((messageStr) => {
              const messageDetails = getChartObject(messageStr);
              return (
                <ChatBox
                  key={messageDetails?.message_id}
                  name={messageDetails?.user?.username}
                  image={messageDetails?.user?.profile_picture_url}
                  message={messageDetails?.message}
                />
              );
            })}
          </div>
        </div>

        {children}
      </div>
    </>
  );
};

export default VideoOverLay;

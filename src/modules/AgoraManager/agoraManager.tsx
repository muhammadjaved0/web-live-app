"use client";
// Import necessary components and hooks from Agora SDK and React
import {
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteUsers,
  useClientEvent,
} from "agora-rtc-react";

import React, { createContext, useContext, useEffect } from "react";
import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-sdk-ng";
import config, { configType } from "../_core/AgoraConfig/config";

// Define the shape of the Agora context
interface AgoraContextType {
  localCameraTrack: ICameraVideoTrack | null;
  localMicrophoneTrack: IMicrophoneAudioTrack | null;
  children: React.ReactNode;
}

// Create the Agora context
const AgoraContext = createContext<AgoraContextType | null>(null);

// AgoraProvider component to provide the Agora context to its children
export const AgoraProvider: React.FC<AgoraContextType> = ({
  children,
  localCameraTrack,
  localMicrophoneTrack,
}) => (
  <AgoraContext.Provider
    value={{ localCameraTrack, localMicrophoneTrack, children }}
  >
    {children}
  </AgoraContext.Provider>
);

// Custom hook to access the Agora context
export const useAgoraContext = () => {
  const context = useContext(AgoraContext);
  if (!context)
    throw new Error("useAgoraContext must be used within an AgoraProvider");
  return context;
};

// AgoraManager component responsible for handling Agora-related logic and rendering UI
export const AgoraManager = ({
  children,
}: {
  config: configType;
  children: React.ReactNode;
}) => {
  // Retrieve local camera and microphone tracks and remote users
  const agoraEngine = useRTCClient();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const remoteUsers = useRemoteUsers();
  console.log("remoteUsers : ", remoteUsers);

  // Publish local tracks
  usePublish([localMicrophoneTrack, localCameraTrack]);

  // Join the Agora channel with the specified configuration
  useJoin({
    appid: config.appId,
    channel: config.channelName,
    token: config.rtcToken,
    uid: config.rtcUid,
  });

  const clientRoleSetting = async () => {
    agoraEngine.setClientRole("audience"); //"audience" //"host"
  };

  useClientEvent(agoraEngine, "user-joined", (user) => {
    console.log("The user", user.uid, " has joined the channel");
  });

  useClientEvent(agoraEngine, "user-left", (user) => {
    console.log("The user", user.uid, " has left the channel");
  });

  useClientEvent(agoraEngine, "user-published", (user) => {
    console.log("The user", user.uid, " has published media in the channel");
  });

  useEffect(() => {
    clientRoleSetting();
    return () => {
      localCameraTrack?.close();
      localMicrophoneTrack?.close();
    };
  }, []);

  const getRemoteVideo = () => {
    if (config.hostUid !== 0) {
      // filter the host form the remote users list and play his stream
      const hostStream = remoteUsers.filter((o) => o.uid === config.hostUid);
      if (hostStream.length === 1) {
        return (
          <div
            className="vid"
            style={{
              height: "100vh",
              width: "100%",
            }}
            key={hostStream[0].uid}
          >
            <RemoteUser
              user={hostStream[0]}
              playVideo={true}
              playAudio={true}
            />
          </div>
        );
      }
    } else {
      // display all users stream
      return (
        <>
          {remoteUsers.map((remoteUser) => (
            <div
              className="vid"
              style={{
                height: "100vh",
                width: "100%",
              }}
              key={remoteUser.uid}
            >
              <RemoteUser user={remoteUser} playVideo={true} playAudio={true} />
            </div>
          ))}
        </>
      );
    }
  };

  // Render the AgoraProvider and associated UI components
  return (
    <AgoraProvider
      localCameraTrack={localCameraTrack}
      localMicrophoneTrack={localMicrophoneTrack}
    >
      {children}
      <></>
      <div id="videos">
        {remoteUsers.length === 0 ? (
          <>
            <div
              style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Loading...
            </div>
          </>
        ) : (
          <>
            {/* Render remote users' video and audio tracks */}
            {getRemoteVideo()}
            {/* {remoteUsers.map((remoteUser) => (
              <div
                className="vid"
                style={{
                  height: "100vh",
                  width: 600,
                }}
                key={remoteUser.uid}
              >
                <RemoteUser
                  user={remoteUser}
                  playVideo={true}
                  playAudio={true}
                />
              </div>
            ))} */}
          </>
        )}
      </div>
    </AgoraProvider>
  );
};

// Export the AgoraManager component as the default export
export default AgoraManager;

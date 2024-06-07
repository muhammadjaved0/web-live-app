import AgoraRTM from "agora-rtm-sdk";
import config from "../_core/AgoraConfig/config";

const SignalingManager = async (
  messageCallback: any,
  eventsCallback: any,
  rtmConfig?: any
) => {
  let signalingEngine: any = null;
  let signalingChannel: any = null;

  // Set up the signaling engine with the provided App ID, UID, and configuration
  const setupSignalingEngine = async (rtmConfig: any) => {
    try {
      rtmConfig = rtmConfig || {
        token: config.rmtToken,
        useStringUserId: config.useStringUserId,
        logUpload: config.logUpload,
        presenceTimeout: config.presenceTimeout,
      };
      signalingEngine = new AgoraRTM.RTM(
        config.appId,
        config.rmtUid,
        rtmConfig
      );
    } catch (error) {
      console.log("Error:", error);
    }

    // Add listeners to handle event notifications
    // Message event handler
    signalingEngine.addEventListener("message", (eventArgs: any) => {
      eventsCallback("message", eventArgs);
      messageCallback(eventArgs.publisher + "-:-" + eventArgs.message);
    });
    // State event handler
    signalingEngine.addEventListener("status", (eventArgs: any) => {
      eventsCallback("status", eventArgs);
    });
  };

  // Login to the signaling engine
  const login = async (uid?: string, token?: string) => {
    try {
      if (uid !== undefined) config.rmtUid = uid;
      if (token !== undefined) config.rmtToken = token;

      await setupSignalingEngine(rtmConfig);
      const result = await signalingEngine.login();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getSignalingEngine = () => {
    return signalingEngine;
  };

  // Logout from the signaling engine
  const logout = async () => {
    await signalingEngine.logout();
  };

  const createChannel = async (channelName?: string) => {
    // Create a signalingChannel
    channelName = channelName || config.channelName;
    try {
      signalingChannel = await signalingEngine.createStreamChannel(channelName);
    } catch (error) {
      console.error(error);
    }
  };

  // Subscribe to a channel
  const subscribe = async (channelName?: string) => {
    channelName = channelName || config.channelName;
    try {
      const subscribeOptions = {
        withMessage: true,
        withPresence: true,
        withMetadata: true,
        withLock: true,
      };
      await signalingEngine.subscribe(channelName, subscribeOptions);
    } catch (error) {
      console.log(error);
    }
  };

  // Unsubscribe a channel
  const unsubscribe = async (channelName?: string) => {
    channelName = channelName || config.channelName;
    try {
      await signalingEngine.unsubscribe(channelName);
      messageCallback("You have successfully left channel " + channelName);
    } catch (error) {
      console.log(error);
    }
  };

  // Send a message to a channel
  const sendChannelMessage = async (channelName: string, Message: string) => {
    const payload = { type: "text", message: Message };
    const publishMessage = JSON.stringify(payload);
    try {
      const sendResult = await signalingEngine?.publish(
        channelName,
        publishMessage
      );
      messageCallback(`Message sent to channel ${channelName}: ${Message}`);
    } catch (error) {
      console.log(error);
    }
  };

  // Get list of active members in the channel
  const getOnlineMembersInChannel = async (
    channelName: any,
    channelType: any
  ) => {
    const result = await getSignalingEngine().presence.getOnlineUsers(
      channelName,
      channelType
    );
    return result.occupants;
  };

  // Return the signaling engine and the available functions
  return {
    getSignalingEngine,
    config,
    login,
    logout,
    createChannel,
    subscribe,
    unsubscribe,
    sendChannelMessage,
    getOnlineMembersInChannel,
  };
};

export default SignalingManager;

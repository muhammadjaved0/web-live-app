"use client";
import { AgoraManager } from "./agoraManager";
import config from "../_core/AgoraConfig/config";
import { useClientEvent, useRTCClient } from "agora-rtc-react";

function AuthenticationWorkflowManager(props: { children?: React.ReactNode }) {
  const agoraEngine = useRTCClient();
  useClientEvent(agoraEngine, "token-privilege-will-expire", () => {
    // We have to renew the token here
    return agoraEngine.renewToken(config.channelRenewToken);
  });

  return (
    <div>
      <AgoraManager config={config}>{props.children}</AgoraManager>
    </div>
  );
}

export default AuthenticationWorkflowManager;

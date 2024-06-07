import { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import AuthenticationWorkflowManager from "./authenticationWorkflowManager";
export function AuthenticationWorkflow() {
  const agoraEngine = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }) //"rtc" | "live" | "p2p"
  );

  return (
    <div>
      <AgoraRTCProvider client={agoraEngine}>
        <AuthenticationWorkflowManager />
      </AgoraRTCProvider>
    </div>
  );
}

export default () => AuthenticationWorkflow();

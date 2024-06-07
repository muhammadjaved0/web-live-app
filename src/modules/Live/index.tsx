import { useEffect, useState } from "react";
import { getChannelDetails } from "../../../pages/api/lib/getChannelDetails";
import { useRouter } from "next/router";
import { AgoraRTCProvider } from "agora-rtc-react";
import AuthenticationWorkflowManager from "../AgoraManager/authenticationWorkflowManager";
import AgoraRTC from "agora-rtc-sdk-ng";
import dynamic from "next/dynamic";
import config from "../_core/AgoraConfig/config";

const VideoOverLay = dynamic(() => import("./component/VideoOverLay"), {
  ssr: false,
});

const Live = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [channelDetails, setChannelDetails] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agoraEngine, setAgoraEngine] = useState(null);

  useEffect(() => {
    if (id && !channelDetails) {
      const fetchChannelDetails = async () => {
        try {
          const data = await getChannelDetails(id as string);

          // for RTC
          console.log("data", data);
          config.rtcUid = Number(data.data.agora_user_id);
          config.channelName = data.data.channel_name;
          config.rtcToken = data.data.rtc_token;
          config.hostUid = Number(data.data.user_details.host.agora_user_id);

          // // For Signaling
          config.rmtToken = data.data.rtm_token;
          config.rmtUid = String(data.data.agora_user_id);
          console.log("config", config);
          setChannelDetails(data.data);
          const initializeAgoraClient = async () => {
            const client = AgoraRTC.createClient({
              codec: "vp8",
              mode: "live",
            });
            setAgoraEngine(client);
          };
          initializeAgoraClient();
        } catch (error: any) {
          // setError(error?.message);
        } finally {
          setLoading(false);
        }
      };

      fetchChannelDetails();
    }
  }, []);

  // useEffect(() => {
  //   // if (typeof window !== "undefined") {

  //   // }
  // }, []);

  console.log("channelDetails", channelDetails);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  console.log("agoraEngine", agoraEngine);

  return (
    <div>
      {channelDetails && agoraEngine && (
         <VideoOverLay hostName={channelDetails?.user_details?.host?.username}>
          <AgoraRTCProvider client={agoraEngine}>
            <AuthenticationWorkflowManager></AuthenticationWorkflowManager>
          </AgoraRTCProvider>
         </VideoOverLay>
      )}
    </div>
  );
};

export default Live;

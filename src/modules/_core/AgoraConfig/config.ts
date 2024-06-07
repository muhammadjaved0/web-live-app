export const config: configType = {
  // For RTC Streaming
  rtcUid: null,
  rtcToken:
    "",
  appId : "31a576db594d4698b0ab15ae6b936431",
  channelName: "",
  channelRenewToken: "",
  hostUid: 0,
  // For signalling
  rmtUid: null,
  rmtToken:
    null,
  useStringUserId: false,
  logUpload: false,
  presenceTimeout: 300,
};

export type configType = {
  // For RTC Streaming
  rtcUid: number | null;
  rtcToken: string | null;
  appId: string | null;
  channelName: string | null;
  channelRenewToken: string | null;
  hostUid: number | null;

  // For signalling
  rmtUid: string | null;
  rmtToken: string | null;
  useStringUserId: boolean;
  logUpload: boolean;
  presenceTimeout: number;
};

export default config;

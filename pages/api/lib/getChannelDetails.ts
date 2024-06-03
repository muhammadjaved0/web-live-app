import axiosInstance from "../axiosInstance";

export const getChannelDetails = async (channelName:string) => {
  try {
    const response = await axiosInstance.get(`/v1/live/web/channel-details`, {
      params: {
        channelName,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching channel details:', error);
    throw error;
  }
};
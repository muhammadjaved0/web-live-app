export const getChannelDetails = async (channelName: string) => {
  try {
    const proxyUrl = 'http://localhost:8080/';
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/live/web/channel-details?channelName=${channelName}`;
    const response = await fetch(proxyUrl + apiUrl, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_WEB_KEY,
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response body as JSON
    return await response.json();
  } catch (error) {
    console.error('Error fetching channel details:', error);
    throw error;
  }
};

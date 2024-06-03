import { useEffect, useState } from "react";
import { getChannelDetails } from "../../../pages/api/lib/getChannelDetails";
import { useRouter } from "next/router";

const Live = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [channelDetails, setChannelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchChannelDetails = async () => {
        try {
          const data = await getChannelDetails(id as string);
          setChannelDetails(data);
        } catch (error: any) {
          setError(error?.message);
        } finally {
          setLoading(false);
        }
      };

      fetchChannelDetails();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Dummy responses until api CORS issue resolved

  const dummyRes = {
    message: "Success",
    status_code: 200,
    data: {
      id: 999,
      channel_name: "19ff913b-951e-48c7-841a-502ae37de09e",
      channel_settings: {
        notify: {
          type: "FOLLOWERS",
          hide_from: ["f8f2890b-a421-47c2-92f1-f1539597dc95-1711085219869"],
        },
        live_type: "duo",
        visibility: {
          type: "FOLLOWERS_YOU_FOLLOW_BACK",
          hide_from: ["28681b71-177c-4fed-b9fa-f306a3735911-1711675498057"],
        },
        description: "this is live",
        allow_comments: false,
        max_no_of_users: 6,
      },
      rtc_token:
        "007eJxTYMhckiSqZZ/KNYc9ZunN9smx+62VhX2+vGI/fGvuOtmuOyUKDMaGiabmZilJppYmKSZmlhZJBolJhqaJqWZJlsZmJsaGTH2xaQ2BjAzB0XksjAyMDCwMjAwgPhOYZAaTLGBShcHQMi3N0tA4SdfS1DBV18Qi2VzXwsQwUdfUwCgx1dg8JdXAMpWFwdjAyBIA2KUoFA==",
      rtm_token:
        "007eJxTYPC45B0hKVFzz3Oz95LdojkXewN/eyiI5Pyb37NbdKPqHT4FBmPDRFNzs5QkU0uTFBMzS4skg8QkQ9PEVLMkS2MzE2NDpr7YtIZARoYPqqcYGBmYGBgZGBlAfBYGYwMjSwCkix0J",
      user_details: {
        host: {
          user_id: "5d5a54fa-1d0f-4c79-9972-55286d5447c6-1714807976028",
          agora_user_id: 3029,
          username: "waqas",
        },
        co_host: [],
        audience: [],
        audience_total: 0,
      },
    },
  };

  return (
    <div>
      <h1>Channel Details</h1>
      <pre>{JSON.stringify(channelDetails, null, 2)}</pre>
    </div>
  );
};

export default Live;

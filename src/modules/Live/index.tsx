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

  return (
    <div>
      <h1>Channel Details</h1>
      <pre>{JSON.stringify(channelDetails, null, 2)}</pre>
    </div>
  );
};

export default Live;

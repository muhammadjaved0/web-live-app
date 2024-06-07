import dynamic from "next/dynamic";
const Live = dynamic(() => import("src/modules/Live"), {
  ssr: false,
});

const LivePage = () => {
  return <Live />;
};
export default LivePage;

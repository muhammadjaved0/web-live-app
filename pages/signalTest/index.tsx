import dynamic from "next/dynamic";
const SignalTest = dynamic(() => import("src/modules/SignalTest"), {
  ssr: false,
});

const SignalTestPage = () => {
  return <SignalTest />;
};
export default SignalTestPage;

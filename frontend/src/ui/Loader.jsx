import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = ({ loading }) => {
  return (
    <div className="absolute h-screen w-screen bg-gray-500 bg-opacity-25 text-cyan-400">
      <ScaleLoader
        height={"70px"}
        loading={loading}
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};
export default Loader;

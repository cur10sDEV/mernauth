import ColorButtons from "./ColorButtons";

const InfoCard = () => {
  return (
    <div className="flex h-72 max-w-4xl flex-col items-center justify-between rounded-md border-2 bg-gray-100 p-12 text-center">
      <h1 className="text-5xl font-semibold">MERN Authentication</h1>
      <p>
        This is a boilerplate for MERN authentication that stores a JWT in an
        HTTP-Only cookie. It also uses Redux Toolkit and TailwindCss.
      </p>
      <div className="action-buttons flex space-x-4">
        <ColorButtons to="/login" bgColor="bg-blue-600">
          Sign In
        </ColorButtons>
        <ColorButtons to="/register" bgColor="bg-gray-600">
          Register
        </ColorButtons>
      </div>
    </div>
  );
};
export default InfoCard;

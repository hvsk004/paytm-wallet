import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col text-center">
      <h1 className="text-3xl m-2 font-semibold"> This is my wallet clone.</h1>
      <button
        className="border-2 text-white bg-black  rounded-md p-2 m-2 min-w-xs"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Signup
      </button>
      <button
        className="border-2 text-white bg-black  rounded-md p-2 m-2 min-w-xs"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
    </div>
  );
}

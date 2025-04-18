import { ClipLoader } from "react-spinners";
import { useState, ReactNode } from "react";

type ButtonWithLoaderProps = {
  children: ReactNode;
  handleClick: () => Promise<void> | void;
};

function ButtonWithLoader({ children, handleClick }: ButtonWithLoaderProps) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      await handleClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="border-2 text-white bg-black  rounded-md p-2 m-2 min-w-xs"
    >
      {loading ? <ClipLoader size={20} color="#fff" /> : children}
    </button>
  );
}

export default ButtonWithLoader;

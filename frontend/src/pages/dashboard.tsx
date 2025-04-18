import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { getUserDetails } from "../api/auth";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const response = await getUserDetails();
        if (!response || !response.data) {
          throw new Error("Failed to fetch User details.");
        }
        setFirstName(response.data.firstName);
      } catch (err) {
        console.log("Error", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      {loading ? (
        <ClipLoader
          color="blue"
          loading={loading}
          size={45}
          speedMultiplier={1}
        />
      ) : (
        `Welcome ${firstName}`
      )}
    </div>
  );
}

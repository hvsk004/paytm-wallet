import React, { useState } from "react";
import { LabeledInput } from "../components/labeledInput";
import ButtonWithLoader from "../components/ButtonWithLoader";
import { login } from "../api/auth";
import ShowMessage from "../components/showMessage";
import { useNavigate } from "react-router-dom";
export function Login() {
  const navigate = useNavigate();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  async function handleLogin() {
    try {
      const response = await login({ username, password });
      console.log(response);

      if (response.status === 200) {
        setMessage({
          message: "Login Successful",
          color: "green-600",
        });

        localStorage.setItem("paytm-jwt", response.data.jwt);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setMessage({
        message: `Login Failed, ${
          err?.response?.data?.message || "Unknown error"
        }`,
        color: "red-600",
      });
    }
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [{ message, color }, setMessage] = useState({
    message: "",
    color: "blue-600" as "red-600" | "green-600" | "blue-600",
  });
  return (
    <div className="border-4 border-black rounded-md p-7 m-5 flex flex-col items-center">
      <h2 className="text-3xl font-semibold my-3">Login</h2>
      <LabeledInput
        label={"Email"}
        name={"username"}
        type={"email"}
        placeholder={"example@example.com"}
        onchange={handleChange}
        value={username}
      />
      <LabeledInput
        label={"Password"}
        name={"password"}
        type={"password"}
        placeholder={"Password"}
        onchange={handleChange}
        value={password}
      />
      <ButtonWithLoader children={<p>Login</p>} handleClick={handleLogin} />
      <ShowMessage text={message} color={color} />
    </div>
  );
}
